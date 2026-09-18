import React, { useState, useEffect } from 'react';
import { PaymentMethodSetting } from '../../types';
import { X, Save } from 'lucide-react';

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: Partial<PaymentMethodSetting> | null;
  onSave: (methodData: Partial<PaymentMethodSetting>) => void;
  lang?: 'bn' | 'en';
}

export const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  isOpen,
  onClose,
  method,
  onSave,
  lang = 'bn'
}) => {
  const [formData, setFormData] = useState<Partial<PaymentMethodSetting>>({
    name: 'bKash',
    accountNumber: '01746349167',
    accountType: 'Personal',
    instructions: 'Send money to 01746349167 and enter transaction ID.',
    isEnabled: true
  });

  useEffect(() => {
    if (method) {
      setFormData(method);
    }
  }, [method]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-lg font-bold font-display text-gray-900">
            {lang === 'bn' ? 'পেমেন্ট মেথড এডিট করুন' : 'Edit Payment Method'}
          </h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'পদ্ধতির নাম (Payment Method Name) *' : 'Method Name *'}
            </label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 text-sm rounded-xl border border-gray-300"
              placeholder="e.g. bKash (Personal / Merchant)"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'একাউন্ট নম্বর / মোবাইল ব্যাংকিং নম্বর *' : 'Account / Phone Number *'}
            </label>
            <input
              type="text"
              required
              value={formData.accountNumber || ''}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              className="w-full p-2.5 text-sm rounded-xl border border-gray-300 font-mono font-bold"
              placeholder="01746349167"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'একাউন্ট ধরন (Account Type)' : 'Account Type'}
            </label>
            <input
              type="text"
              value={formData.accountType || ''}
              onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
              className="w-full p-2 rounded-xl border border-gray-300"
              placeholder="Personal (Send Money) / Merchant (Payment)"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-gray-700">
              {lang === 'bn' ? 'পেমেন্ট নির্দেশনাবলী (Instructions) *' : 'Instructions *'}
            </label>
            <textarea
              rows={3}
              required
              value={formData.instructions || ''}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
              placeholder="Steps for the student/parent to pay..."
            />
          </div>

          <label className="flex items-center gap-2 font-bold text-gray-700 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={formData.isEnabled ?? true}
              onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
              className="accent-[#064E3B] w-4 h-4"
            />
            <span>{lang === 'bn' ? 'পেমেন্ট মেথড সক্রিয় রাখুন (Enabled)' : 'Enable this Payment Method'}</span>
          </label>

          <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-gray-600 bg-gray-100 hover:bg-gray-200 font-bold"
            >
              {lang === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl text-white bg-[#064E3B] hover:bg-[#053c2d] font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Method'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
