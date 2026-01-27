import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FileText, Upload, X, Eye, File, AlertCircle } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

export default function PDFUploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      processFiles(Array.from(selectedFiles));
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) {
      processFiles(Array.from(droppedFiles));
    }
  };

  const processFiles = (newFiles: File[]) => {
    setError(null);
    
    const pdfFiles = newFiles.filter((file) => file.type === 'application/pdf');
    
    if (pdfFiles.length !== newFiles.length) {
      setError('Chỉ chấp nhận file PDF. Một số file đã bị bỏ qua.');
    }

    const uploadedFiles: UploadedFile[] = pdfFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
      uploadedAt: new Date(),
    }));

    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const handleRemoveFile = (id: string) => {
    const file = files.find((f) => f.id === id);
    if (file) {
      URL.revokeObjectURL(file.url);
    }
    setFiles((prev) => prev.filter((f) => f.id !== id));
    if (selectedFile?.id === id) {
      setSelectedFile(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="ornate-divider mb-8">
              <FileText className="h-8 w-8 text-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gold-gradient mb-4">
              Tài liệu PDF
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tải lên và xem các tài liệu ôn tập ở định dạng PDF. Tất cả file được lưu trữ cục bộ trên trình duyệt.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Upload Area */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`parchment-card p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? 'border-gold bg-gold/10'
                    : 'border-gold/30 hover:border-gold/50 hover:bg-gold/5'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    Kéo thả file PDF vào đây
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    hoặc click để chọn file từ máy tính
                  </p>
                  <Button variant="gold" size="sm">
                    Chọn file PDF
                  </Button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-crimson/10 border border-crimson/30 rounded-lg flex items-center gap-3"
                >
                  <AlertCircle className="h-5 w-5 text-crimson flex-shrink-0" />
                  <p className="text-sm text-crimson">{error}</p>
                </motion.div>
              )}

              {/* File List */}
              <div className="mt-8">
                <h3 className="font-heading text-lg font-semibold mb-4">
                  Danh sách file ({files.length})
                </h3>
                {files.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <File className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Chưa có file nào được tải lên</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {files.map((file) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`parchment-card p-4 rounded-lg flex items-center gap-4 ${
                          selectedFile?.id === file.id ? 'ring-2 ring-gold' : ''
                        }`}
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-crimson/10 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-crimson" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedFile(file)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFile(file.id)}
                            className="text-crimson hover:text-crimson"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* PDF Viewer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-24"
            >
              <div className="parchment-card rounded-xl overflow-hidden h-[600px]">
                {selectedFile ? (
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b border-gold/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-crimson" />
                        <span className="font-medium truncate max-w-[200px]">
                          {selectedFile.name}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex-1">
                      <iframe
                        src={selectedFile.url}
                        title={selectedFile.name}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center p-8">
                    <div>
                      <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                      <h3 className="font-heading text-lg font-semibold text-muted-foreground mb-2">
                        Chọn file để xem
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Tải lên và chọn một file PDF từ danh sách bên trái để xem nội dung.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-gold/5 border border-gold/20 rounded-lg">
                <h4 className="font-heading font-semibold text-gold mb-2">
                  💡 Mẹo sử dụng
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Kéo thả nhiều file cùng lúc để tải lên nhanh hơn</li>
                  <li>• File được lưu tạm trên trình duyệt, sẽ mất khi đóng tab</li>
                  <li>• Hỗ trợ xem file PDF trực tiếp trong trình duyệt</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
