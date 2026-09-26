"use client";

import { useState, useRef, useEffect } from "react";
import { X, Upload, LoaderCircle, CheckCircle2 } from "lucide-react";
import { getSupabase } from "@/lib/supabase/client";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdated: () => void;
}

export function EditProfileModal({ isOpen, onClose, onProfileUpdated }: EditProfileModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      const rawSession = window.localStorage.getItem("satuurusan_session");
      if (rawSession) {
        try {
          const session = JSON.parse(rawSession);
          setName(session.name || "");
          setEmail(session.email || "");
          setPhone(session.phone || "");
          setProvince(session.province || "");
          setCity(session.city || "");
          setAvatarUrl(session.avatar_url || "");
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      
      // ImgBB API
      const res = await fetch("https://api.imgbb.com/1/upload?key=cf9a34a2612e3c6ad3b476663f63956e", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      if (data.success) {
        setAvatarUrl(data.data.url);
      } else {
        alert("Gagal mengunggah foto. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Terjadi kesalahan saat mengunggah foto.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const profileData = {
      name,
      email,
      phone,
      province,
      city,
      avatar_url: avatarUrl,
    };

    // Save to LocalStorage
    if (typeof window !== "undefined") {
      window.localStorage.setItem("satuurusan_session", JSON.stringify(profileData));
      window.dispatchEvent(new CustomEvent("satuurusan-session-changed"));
    }

    // Save to Supabase DB (if available)
    const supabase = getSupabase();
    if (supabase) {
      try {
        // Try updating existing or insert
        // The DB might not have the table, but we try anyway as requested
        const { error } = await supabase
          .from("profiles")
          .upsert({
            id: email, // Using email as id fallback
            full_name: name,
            email: email,
            phone: phone,
            province: province,
            city: city,
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString()
          }, { onConflict: 'email' });
          
        if (error) console.warn("Supabase save profile warning:", error);
      } catch (err) {
        console.warn("Supabase save profile failed:", err);
      }
    }

    setIsSaving(false);
    setShowSuccess(true);
    
    onProfileUpdated();
    
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100">
          <h2 className="font-display font-bold text-xl text-[#0f274a]">Edit Biodata</h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-5 sm:p-6 custom-scrollbar">
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="font-bold text-slate-700 text-lg">Biodata Tersimpan!</p>
            </div>
          ) : (
            <form id="profile-form" onSubmit={handleSave} className="space-y-6">
              
              {/* Photo Upload */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative group inline-block">
                  <div className="w-24 h-24 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center relative">
                    <img 
                      src={avatarUrl || `https://api.dicebear.com/9.x/micah/svg?seed=${encodeURIComponent(name || "Teman Satu")}&backgroundColor=b6e3f4,c0aede,d1d4f9`} 
                      alt="Avatar" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  {avatarUrl && (
                    <button 
                      type="button"
                      onClick={() => setAvatarUrl("")}
                      className="absolute -top-1 -right-1 p-1.5 bg-white text-rose-500 rounded-full shadow border border-slate-200 hover:bg-rose-50 transition-colors z-10"
                      title="Hapus Foto"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow border-2 border-white hover:bg-blue-700 transition-colors z-10"
                    disabled={isUploading}
                    title="Unggah Foto"
                  >
                    {isUploading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                <p className="text-xs text-slate-500">Format: JPG, PNG (Max 5MB)</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Alamat Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Nomor Telepon</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812xxxx"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Provinsi</label>
                    <input
                      type="text"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Kota / Kabupaten</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
        
        {!showSuccess && (
          <div className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Batal
            </button>
            <button
              form="profile-form"
              type="submit"
              disabled={isSaving || isUploading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition-colors disabled:opacity-50"
            >
              {isSaving ? <LoaderCircle className="w-4 h-4 animate-spin" /> : "Simpan Profil"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
