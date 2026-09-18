import React, { useState, useEffect, useRef } from 'react';
import { 
  HardDrive, 
  FolderPlus, 
  UploadCloud, 
  FileText, 
  Trash2, 
  ExternalLink, 
  Search, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Folder, 
  File, 
  Download, 
  LogOut, 
  BookOpen, 
  Plus, 
  X, 
  Sparkles,
  ArrowLeft,
  Calendar
} from 'lucide-react';
import { 
  googleSignIn, 
  logoutGoogle, 
  initAuth, 
  getAccessToken,
  listDriveFiles, 
  createDriveFolder, 
  uploadFileToDrive, 
  createLessonTextDocument, 
  deleteDriveItem, 
  DriveFileItem,
  auth
} from '../services/googleDriveService';
import { User } from 'firebase/auth';

interface GoogleDrivePageProps {
  onBack?: () => void;
}

export const GoogleDrivePage: React.FC<GoogleDrivePageProps> = ({ onBack }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Drive state
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFolderId, setCurrentFolderId] = useState<string>('root');
  const [folderBreadcrumbs, setFolderBreadcrumbs] = useState<Array<{ id: string; name: string }>>([
    { id: 'root', name: 'My Drive (মূল ড্রাইভ)' }
  ]);

  // Modals & User actions
  const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  
  // Mandatory User Confirmation for destructive actions
  const [itemToDelete, setItemToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Initialize Auth state listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
      },
      () => {
        setCurrentUser(auth.currentUser);
        // Token might still be null until button click
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch files when token or folder changes
  const loadFiles = async (folderId = currentFolderId, query = searchQuery) => {
    if (!accessToken) return;
    setIsLoadingFiles(true);
    try {
      const res = await listDriveFiles(folderId, query);
      setFiles(res.files);
    } catch (err: any) {
      console.error('Failed to load drive files:', err);
      showToast('ড্রাইভ থেকে ফাইল লোড করতে সমস্যা হয়েছে: ' + (err.message || ''));
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      loadFiles(currentFolderId, searchQuery);
    }
  }, [accessToken, currentFolderId]);

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setAccessToken(result.accessToken);
        showToast('Google Drive সফলভাবে সংযুক্ত হয়েছে!');
      }
    } catch (err: any) {
      console.error('Sign-in error:', err);
      setAuthError(err.message || 'Google সাইন-ইন সম্পন্ন করা যায়নি। অনুগ্রহ করে পপআপ অনুমোদন করুন।');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    await logoutGoogle();
    setCurrentUser(null);
    setAccessToken(null);
    setFiles([]);
    showToast('Google একাউন্ট সংযোগ বিচ্ছিন্ন করা হয়েছে।');
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    try {
      await createDriveFolder(newFolderName.trim(), currentFolderId);
      setNewFolderName('');
      setIsNewFolderOpen(false);
      showToast(`'${newFolderName}' ফোল্ডার তৈরি হয়েছে!`);
      loadFiles();
    } catch (err: any) {
      showToast('ফোল্ডার তৈরিতে ব্যর্থ: ' + err.message);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];
    
    setIsUploading(true);
    try {
      await uploadFileToDrive(file, currentFolderId);
      showToast(`'${file.name}' সফলভাবে ড্রাইভে আপলোড হয়েছে!`);
      loadFiles();
    } catch (err: any) {
      showToast('ফাইল আপলোডে ব্যর্থ: ' + err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;
    try {
      await createLessonTextDocument(noteTitle.trim(), noteContent, currentFolderId);
      setNoteTitle('');
      setNoteContent('');
      setIsNoteModalOpen(false);
      showToast('কুরআন লেসন নোট ড্রাইভে সংরক্ষিত হয়েছে!');
      loadFiles();
    } catch (err: any) {
      showToast('নোট তৈরিতে ব্যর্থ: ' + err.message);
    }
  };

  // MANDATORY USER CONFIRMATION DELETION
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDriveItem(itemToDelete.id);
      showToast(`'${itemToDelete.name}' ড্রাইভ থেকে মুছে ফেলা হয়েছে।`);
      setItemToDelete(null);
      loadFiles();
    } catch (err: any) {
      showToast('ফাইল মুছতে ব্যর্থ: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const navigateIntoFolder = (folderId: string, folderName: string) => {
    setCurrentFolderId(folderId);
    setFolderBreadcrumbs(prev => [...prev, { id: folderId, name: folderName }]);
  };

  const navigateBreadcrumb = (index: number) => {
    const target = folderBreadcrumbs[index];
    setFolderBreadcrumbs(prev => prev.slice(0, index + 1));
    setCurrentFolderId(target.id);
  };

  const formatFileSize = (bytes?: string) => {
    if (!bytes) return '—';
    const num = parseInt(bytes, 10);
    if (isNaN(num)) return '—';
    if (num < 1024) return `${num} B`;
    if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
    return `${(num / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] py-10 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#064E3B] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-400/30 animate-bounce">
          <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#064E3B] to-[#0A3D30] text-white p-6 sm:p-8 rounded-3xl shadow-md border border-[#D4AF37]/30">
          <div className="space-y-2">
            {onBack && (
              <button 
                onClick={onBack}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-200 hover:text-white mb-2 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>আগের পেজে ফিরুন</span>
              </button>
            )}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#D4AF37]">
              <HardDrive className="w-3.5 h-3.5" />
              <span>Official Google Drive Integration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              কুরআন একাডেমি গুগল ড্রাইভ লাইব্রেরি
            </h1>
            <p className="text-emerald-100/90 text-sm max-w-2xl">
              নূরানী কায়দা, তাজবীদ বই, হিফজ সিলেবাস, হোমওয়ার্ক শীট ও অডিও ফাইল সরাসরি আপনার গুগল ড্রাইভে ব্রাউজ ও সংরক্ষণ করুন।
            </p>
          </div>

          {/* User Profile / Status */}
          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/15 flex items-center gap-4">
            {currentUser && accessToken ? (
              <div className="flex items-center gap-3">
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName || 'Google User'} 
                    className="w-11 h-11 rounded-full border-2 border-[#D4AF37] object-cover"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#D4AF37] text-gray-950 font-bold flex items-center justify-center">
                    {currentUser.displayName?.[0] || 'U'}
                  </div>
                )}
                <div className="text-left">
                  <div className="text-xs text-emerald-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                    <span>ড্রাইভ কানেক্টেড</span>
                  </div>
                  <p className="font-semibold text-sm text-white line-clamp-1">{currentUser.displayName || 'Google User'}</p>
                  <p className="text-xs text-emerald-200/70 line-clamp-1">{currentUser.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  title="সাইন আউট"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors ml-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center sm:text-right">
                <span className="text-xs text-emerald-200 block mb-1">ড্রাইভ কানেক্ট করা নেই</span>
                <span className="text-xs text-white/70 block">সাইন-ইন করে ড্রাইভের ফাইল পরিচালনা করুন</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto">
        {!accessToken ? (
          /* Sign In Prompt with Official Google Styling */
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-gray-200/80 shadow-sm max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#064E3B] flex items-center justify-center mx-auto border border-emerald-100 shadow-xs">
              <HardDrive className="w-8 h-8 text-[#064E3B]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-serif text-gray-900">গুগল ড্রাইভ কানেক্ট করুন</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                আপনার গুগল ড্রাইভে সরাসরি নূরানী কায়দা, তাজবীদ হ্যান্ডআউট, হিফজ ট্র্যাকার ও ক্লাস নোট সেভ করতে সাইন-ইন সম্পন্ন করুন।
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 text-left">
                <strong>ত্রুটি:</strong> {authError}
              </div>
            )}

            {/* Official Material Design "Sign in with Google" button */}
            <div className="flex justify-center pt-2">
              <button 
                onClick={handleSignIn}
                disabled={isAuthenticating}
                className="gsi-material-button inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                <div className="gsi-material-button-icon">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 block">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  </svg>
                </div>
                <span className="font-semibold text-gray-700 text-sm">
                  {isAuthenticating ? 'সংযোগ হচ্ছে...' : 'Sign in with Google'}
                </span>
              </button>
            </div>

            <p className="text-xs text-gray-500 italic">
              * আপনার ড্রাইভের ডেটা সর্বোচ্চ নিরাপদ। এই অ্যাপটি শুধুমাত্র আপনার অনুমতি অনুযায়ী পাঠ্য উপকরণ ও নোটের জন্য ড্রাইভ ব্যবহারের সুবিধা প্রদান করে।
            </p>
          </div>
        ) : (
          /* Google Drive Workspace Explorer */
          <div className="space-y-6">
            {/* Quick Islamic Academy Template Generator */}
            <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D4AF37] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">১-ক্লিক কুরআন শিক্ষা টেমপ্লেট ড্রাইভে সেভ করুন</h4>
                  <p className="text-xs text-gray-500">প্রয়োজনীয় নূরানী কায়দা সিলেবাস ও তাজবীদ শিডিউল সরাসরি গুগল ড্রাইভে তৈরি করুন</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setNoteTitle('নূরানী কায়দা - লেসন প্ল্যান ও সিলেবাস');
                    setNoteContent(`[Online Quran Academy - নূরানী কায়দা সিলেবাস]\n\nঅধ্যায় ১: হরফের মাখরাজ ও উচ্চারণ পরিচয়\nঅধ্যায় ২: মোরাক্কাব বা যুক্তাক্ষর চেনার কৌশল\nঅধ্যায় ৩: হরকত (যবর, যের, পেশ)\nঅধ্যায় ৪: তানভীন ও খাড়া হরকত\nঅধ্যায় ৫: মাদের হরফ (মদ্দে তবাই)\nঅধ্যায় ৬: জযম বা সাকীন ও কলকলাহর নিয়ম\nঅধ্যায় ৭: তাশদীদ ও ওয়াজিব গুন্নাহ\nঅধ্যায় ৮: নূন সাকীন ও তানভীনের ৪টি নিয়ম (ইযহার, ইদগাম, ইক্বলাব, ইখফা)\n\nশিক্ষার্থীর নাম: _____________\nউস্তাদ/উস্তাযার নাম: _____________`);
                    setIsNoteModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-[#064E3B] text-xs font-semibold hover:bg-emerald-100 transition-colors border border-emerald-200 cursor-pointer flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>কায়দা সিলেবাস টেমপ্লেট</span>
                </button>

                <button
                  onClick={() => {
                    setNoteTitle('তাজবীদ ও হিফজ - সাপ্তাহিক প্রগ্রেস রিপোর্ট');
                    setNoteContent(`[সাপ্তাহিক কুরআন ক্লাস মূল্যায়ন শীট]\n\nতারিখ: ${new Date().toLocaleDateString('bn-BD')}\nকোর্স: সহীহ কুরআন পাঠ ও তাজবীদ\nসপ্তাহের নির্ধারিত সাবাক: সূরা মুলক (১-১০ আয়াত)\nপূর্বের পড়া (সাবাকী): সূরা ইয়াসীন\nআমুক্তা: পারা ৩০\n\nউপস্থিতি: ৩/৩ দিন\nতাজবীদ পর্যবেক্ষণ: গুন্নাহ ও মাখরাজে সন্তোষজনক অগ্রগতি।\nহোমওয়ার্ক: আগামী ক্লাসের জন্য ১১-১৫ আয়াত মুখস্থ করণ।`);
                    setIsNoteModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition-colors border border-amber-200 cursor-pointer flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>হিফজ রিপোর্ট টেমপ্লেট</span>
                </button>
              </div>
            </div>

            {/* Explorer Toolbar */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Breadcrumbs */}
                <nav className="flex items-center flex-wrap gap-1.5 text-xs text-gray-600 font-medium">
                  {folderBreadcrumbs.map((crumb, idx) => (
                    <React.Fragment key={crumb.id}>
                      {idx > 0 && <span className="text-gray-400">/</span>}
                      <button
                        onClick={() => navigateBreadcrumb(idx)}
                        className={`hover:text-[#064E3B] px-1.5 py-0.5 rounded-md transition-colors cursor-pointer ${
                          idx === folderBreadcrumbs.length - 1 ? 'font-bold text-[#064E3B] bg-emerald-50' : ''
                        }`}
                      >
                        {crumb.name}
                      </button>
                    </React.Fragment>
                  ))}
                </nav>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => loadFiles()}
                    disabled={isLoadingFiles}
                    title="রিফ্রেশ"
                    className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingFiles ? 'animate-spin text-[#064E3B]' : ''}`} />
                  </button>

                  <button
                    onClick={() => setIsNewFolderOpen(true)}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <FolderPlus className="w-4 h-4 text-emerald-700" />
                    <span>নতুন ফোল্ডার</span>
                  </button>

                  <button
                    onClick={() => setIsNoteModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-amber-700" />
                    <span>ক্লাস নোট তৈরি</span>
                  </button>

                  {/* Hidden file input for upload */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-4 py-2 rounded-xl bg-[#064E3B] hover:bg-[#073F30] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    <UploadCloud className="w-4 h-4 text-[#D4AF37]" />
                    <span>{isUploading ? 'আপলোড হচ্ছে...' : 'ফাইল আপলোড'}</span>
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="গুগল ড্রাইভে কুরআন কায়দা, তাজবীদ বা অডিও ফাইল খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && loadFiles(currentFolderId, searchQuery)}
                  className="w-full pl-10 pr-24 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      loadFiles(currentFolderId, '');
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                  >
                    মুছে ফেলুন
                  </button>
                )}
              </div>
            </div>

            {/* File List / Grid */}
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-[#FAF8F2] flex items-center justify-between text-xs font-bold text-gray-600">
                <span className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-[#064E3B]" />
                  <span>ড্রাইভের ফাইল তালিকা ({files.length} টি আইটেম)</span>
                </span>
                <span className="text-gray-400 font-normal">Google Drive Cloud Storage</span>
              </div>

              {isLoadingFiles ? (
                <div className="p-16 text-center text-gray-500 space-y-3">
                  <RefreshCw className="w-8 h-8 text-[#064E3B] animate-spin mx-auto" />
                  <p className="text-sm font-medium">গুগল ড্রাইভ থেকে ফাইলসমূহ আনা হচ্ছে...</p>
                </div>
              ) : files.length === 0 ? (
                <div className="p-16 text-center text-gray-500 space-y-3">
                  <Folder className="w-12 h-12 text-gray-300 mx-auto" />
                  <p className="text-base font-semibold text-gray-700">এই ফোল্ডারে কোনো ফাইল পাওয়া যায়নি</p>
                  <p className="text-xs text-gray-400">নতুন ফাইল আপলোড করতে উপরের 'ফাইল আপলোড' অথবা 'ক্লাস নোট তৈরি' বাটনে চাপুন।</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {files.map((item) => {
                    const isFolder = item.mimeType === 'application/vnd.google-apps.folder';

                    return (
                      <div 
                        key={item.id}
                        className="p-4 hover:bg-gray-50/80 transition-colors flex items-center justify-between gap-4 group"
                      >
                        {/* Name & Icon */}
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isFolder ? 'bg-amber-100 text-amber-800' : 'bg-emerald-50 text-[#064E3B]'
                          }`}>
                            {isFolder ? (
                              <Folder className="w-5 h-5 fill-amber-700 text-amber-700" />
                            ) : (
                              <FileText className="w-5 h-5" />
                            )}
                          </div>

                          <div className="min-w-0">
                            {isFolder ? (
                              <button
                                onClick={() => navigateIntoFolder(item.id, item.name)}
                                className="font-semibold text-sm text-gray-900 hover:text-[#064E3B] hover:underline text-left truncate block cursor-pointer"
                              >
                                {item.name}
                              </button>
                            ) : (
                              <span className="font-semibold text-sm text-gray-800 truncate block">
                                {item.name}
                              </span>
                            )}
                            <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                              <span>{formatFileSize(item.size)}</span>
                              {item.modifiedTime && (
                                <span>• {new Date(item.modifiedTime).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.webViewLink && (
                            <a
                              href={item.webViewLink}
                              target="_blank"
                              rel="noreferrer"
                              title="গুগল ড্রাইভে খুলুন"
                              className="p-2 text-gray-500 hover:text-[#064E3B] hover:bg-emerald-50 rounded-lg transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}

                          {item.webContentLink && (
                            <a
                              href={item.webContentLink}
                              target="_blank"
                              rel="noreferrer"
                              title="ডাউনলোড"
                              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}

                          {/* Mandatory explicit user confirmation delete */}
                          <button
                            onClick={() => setItemToDelete(item)}
                            title="মুছে ফেলুন"
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: Create New Folder */}
      {isNewFolderOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-serif text-gray-900 flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-[#064E3B]" />
                <span>নতুন ফোল্ডার তৈরি করুন</span>
              </h3>
              <button 
                onClick={() => setIsNewFolderOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ফোল্ডারের নাম
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: তাজবীদ ক্লাস লেকচার ২০২৬"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewFolderOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#064E3B] text-white hover:bg-[#073F30]"
                >
                  তৈরি করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Create Lesson Note */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-gray-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-serif text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#064E3B]" />
                <span>ক্লাস নোট বা সিলেবাস ড্রাইভে সংরক্ষণ</span>
              </h3>
              <button 
                onClick={() => setIsNoteModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  নোট বা ডকুমেন্টের শিরোনাম
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: সূরা ফাতিহার শানে নুযূল ও তাজবীদ নোট"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  নোটের বিবরণ / টেক্সট
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="এখানে পাঠ্য বিষয় ও ক্লাসের পড়া লিখুন..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNoteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#064E3B] text-white hover:bg-[#073F30]"
                >
                  ড্রাইভে সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANDATORY USER CONFIRMATION DIALOG FOR DESTRUCTIVE ACTION (Skill requirement) */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-red-200 space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-gray-900">গুগল ড্রাইভ থেকে ফাইল মুছে ফেলবেন?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                আপনি কি নিশ্চিতভাবে <span className="font-semibold text-gray-900">"{itemToDelete.name}"</span> আইটেমটি গুগল ড্রাইভ থেকে স্থায়ীভাবে মুছে ফেলতে চান?
              </p>
              <p className="text-[11px] text-red-600 bg-red-50 py-1.5 px-3 rounded-lg">
                ⚠️ এই অ্যাকশনটি সম্পন্ন হলে তা আর ফিরিয়ে আনা যাবে না।
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setItemToDelete(null)}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                না, বাতিল করুন
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isDeleting ? 'মোছা হচ্ছে...' : 'হ্যাঁ, নিশ্চিত মুছুন'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
