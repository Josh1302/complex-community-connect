
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Paperclip, 
  X, 
  Image, 
  Video, 
  FileText,
  File
} from "lucide-react";

interface FileItem {
  file: File;
  preview?: string;
  type: 'image' | 'video' | 'document' | 'other';
}

interface FileUploadProps {
  files: FileItem[];
  onFilesChange: (files: FileItem[]) => void;
}

export const FileUpload = ({ files, onFilesChange }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileType = (file: File): 'image' | 'video' | 'document' | 'other' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('text')) return 'document';
    return 'other';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    const newFiles: FileItem[] = selectedFiles.map(file => {
      const type = getFileType(file);
      let preview: string | undefined;
      
      if (type === 'image') {
        preview = URL.createObjectURL(file);
      }
      
      return { file, preview, type };
    });

    onFilesChange([...files, ...newFiles]);
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2"
        >
          <Paperclip className="h-4 w-4" />
          Attach Files
        </Button>
        <span className="text-xs text-gray-500">
          Photos, videos, documents (max 10MB per file)
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,.doc,.docx,.txt"
        onChange={handleFileSelect}
        className="hidden"
      />

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">Attached Files:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {files.map((fileItem, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                {fileItem.type === 'image' && fileItem.preview && (
                  <img 
                    src={fileItem.preview} 
                    alt="Preview" 
                    className="w-8 h-8 object-cover rounded"
                  />
                )}
                {fileItem.type !== 'image' && (
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                    {getFileIcon(fileItem.type)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {fileItem.file.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {(fileItem.file.size / 1024 / 1024).toFixed(1)} MB
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {fileItem.type}
                </Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
