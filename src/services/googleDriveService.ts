import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google Auth Provider with Requested Google Drive Scopes
export const DRIVE_SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.metadata.readonly'
];

const provider = new GoogleAuthProvider();
DRIVE_SCOPES.forEach(scope => provider.addScope(scope));
provider.setCustomParameters({ prompt: 'consent' });

// In-Memory Token Cache (MANDATORY: NEVER store access token in localStorage/sessionStorage)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  webContentLink?: string;
  iconLink?: string;
  thumbnailLink?: string;
  size?: string;
  modifiedTime?: string;
  createdTime?: string;
  parents?: string[];
  owners?: Array<{ displayName?: string; emailAddress?: string }>;
}

/**
 * Initialize auth listener. Clears in-memory token on sign-out.
 */
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // User logged in but token not yet in memory - prompt sign-in popup if needed
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

/**
 * Sign in with Google Popup and obtain OAuth access token
 */
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential?.accessToken) {
      throw new Error('Could not retrieve Google Drive access token from authentication result.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign In / Drive auth error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Return current in-memory cached token
 */
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

/**
 * Sign out and clear in-memory credentials
 */
export const logoutGoogle = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
};

/**
 * Check if currently authenticated with Google Drive token
 */
export const isGoogleAuthenticated = (): boolean => {
  return !!cachedAccessToken && !!auth.currentUser;
};

// =========================================================================
// GOOGLE DRIVE API CALLS (Client-Side Bearer Token Pattern)
// =========================================================================

/**
 * List files from Google Drive
 */
export const listDriveFiles = async (
  folderId?: string,
  searchQuery?: string,
  pageToken?: string
): Promise<{ files: DriveFileItem[]; nextPageToken?: string }> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated with Google Drive. Please sign in with Google first.');
  }

  const queryParts: string[] = ['trashed = false'];
  
  if (folderId && folderId !== 'root') {
    queryParts.push(`'${folderId}' in parents`);
  }
  
  if (searchQuery && searchQuery.trim()) {
    const escaped = searchQuery.replace(/'/g, "\\'");
    queryParts.push(`name contains '${escaped}'`);
  }

  const q = encodeURIComponent(queryParts.join(' and '));
  const fields = encodeURIComponent('nextPageToken,files(id,name,mimeType,webViewLink,webContentLink,iconLink,thumbnailLink,size,modifiedTime,createdTime,parents,owners)');
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&pageSize=40&orderBy=folder,name,modifiedTime desc`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Drive API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return {
    files: data.files || [],
    nextPageToken: data.nextPageToken
  };
};

/**
 * Create a new folder in Google Drive
 */
export const createDriveFolder = async (folderName: string, parentFolderId?: string): Promise<DriveFileItem> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated with Google Drive.');
  }

  const metadata: any = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };

  if (parentFolderId && parentFolderId !== 'root') {
    metadata.parents = [parentFolderId];
  }

  const res = await fetch('https://www.googleapis.com/drive/v3/files?fields=id,name,mimeType,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(metadata)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to create folder: ${errText}`);
  }

  return await res.json();
};

/**
 * Upload a file to Google Drive using multipart upload
 */
export const uploadFileToDrive = async (
  file: File,
  parentFolderId?: string,
  customName?: string
): Promise<DriveFileItem> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated with Google Drive.');
  }

  const metadata: any = {
    name: customName || file.name,
    mimeType: file.type || 'application/octet-stream'
  };

  if (parentFolderId && parentFolderId !== 'root') {
    metadata.parents = [parentFolderId];
  }

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const reader = new FileReader();
  const fileArrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });

  const metadataPart = `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`;
  const mediaHeader = `--${boundary}\r\nContent-Type: ${metadata.mimeType}\r\n\r\n`;

  const metadataBlob = new Blob([metadataPart], { type: 'text/plain' });
  const mediaHeaderBlob = new Blob([mediaHeader], { type: 'text/plain' });
  const closeBlob = new Blob([closeDelimiter], { type: 'text/plain' });

  const multipartBody = new Blob(
    [metadataBlob, mediaHeaderBlob, new Uint8Array(fileArrayBuffer), closeBlob],
    { type: `multipart/related; boundary=${boundary}` }
  );

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,size,thumbnailLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: multipartBody
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to upload file: ${errText}`);
  }

  return await res.json();
};

/**
 * Create a lesson note / syllabus text file directly in Google Drive
 */
export const createLessonTextDocument = async (
  title: string,
  textContent: string,
  parentFolderId?: string
): Promise<DriveFileItem> => {
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const file = new File([blob], `${title.endsWith('.txt') ? title : `${title}.txt`}`, { type: 'text/plain' });
  return uploadFileToDrive(file, parentFolderId);
};

/**
 * Delete a file from Google Drive (Permanent or Trash)
 * MANDATORY: Always invoke after user confirmed through UI dialog!
 */
export const deleteDriveItem = async (fileId: string): Promise<void> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated with Google Drive.');
  }

  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok && res.status !== 204) {
    const errText = await res.text();
    throw new Error(`Failed to delete Google Drive item: ${errText}`);
  }
};
