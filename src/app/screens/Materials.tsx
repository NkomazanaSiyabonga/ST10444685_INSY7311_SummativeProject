import { useState } from 'react';
import { Menu, Upload, Folder, FileText, Star, Download, Search, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { BottomNav } from '../components/BottomNav';
import { Sidebar } from '../components/Sidebar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '../components/ui/alert-dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

interface UploadedFile {
  id: string;
  name: string;
  uploader: string;
  uploadDate: string;
  rating: number;
  ratingCount: number;
  size: string;
  type: string;
}

interface CommunityFolder {
  id: string;
  name: string;
  files: UploadedFile[];
}

// Mock data
const mockFolders: CommunityFolder[] = [
  {
    id: '1',
    name: 'Computer Science',
    files: [
      {
        id: '1',
        name: 'Algorithm Notes - Week 5.pdf',
        uploader: 'Sarah Chen',
        uploadDate: '2024-03-20',
        rating: 4.5,
        ratingCount: 12,
        size: '2.4 MB',
        type: 'PDF',
      },
      {
        id: '2',
        name: 'Data Structures Cheat Sheet.pdf',
        uploader: 'Mike Johnson',
        uploadDate: '2024-03-18',
        rating: 4.8,
        ratingCount: 25,
        size: '1.1 MB',
        type: 'PDF',
      },
    ],
  },
  {
    id: '2',
    name: 'Database Systems',
    files: [
      {
        id: '3',
        name: 'SQL Query Examples.docx',
        uploader: 'Emily Davis',
        uploadDate: '2024-03-19',
        rating: 4.2,
        ratingCount: 8,
        size: '856 KB',
        type: 'DOCX',
      },
      {
        id: '4',
        name: 'ER Diagram Tutorial.pdf',
        uploader: 'John Smith',
        uploadDate: '2024-03-15',
        rating: 4.6,
        ratingCount: 15,
        size: '3.2 MB',
        type: 'PDF',
      },
    ],
  },
];

type AlertType = 'upload-success' | 'upload-error' | 'download-success' | 'download-error' | null;

export function Materials() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>(null);
  const [uploadForm, setUploadForm] = useState({
    fileName: '',
    folder: '',
    file: null as File | null,
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock upload functionality - simulate random success/failure
    const isSuccess = Math.random() > 0.3; // 70% success rate for demo

    if (isSuccess) {
      setAlertType('upload-success');
      setUploadDialogOpen(false);
      setUploadForm({ fileName: '', folder: '', file: null });
    } else {
      setAlertType('upload-error');
      setUploadDialogOpen(false);
    }
  };

  const handleDownload = (fileName: string) => {
    // Mock download functionality - simulate random success/failure
    const isSuccess = Math.random() > 0.2; // 80% success rate for demo

    if (isSuccess) {
      setAlertType('download-success');
    } else {
      setAlertType('download-error');
    }
  };

  const handleTryAgain = () => {
    setAlertType(null);
    if (uploadForm.fileName || uploadForm.file) {
      setUploadDialogOpen(true);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-black text-white border-b border-gray-800 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white hover:text-gray-300"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search materials..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Upload Material</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="folder">Select Folder</Label>
                    <Select
                      value={uploadForm.folder}
                      onValueChange={(value) =>
                        setUploadForm((prev) => ({ ...prev, folder: value }))
                      }
                    >
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Choose a folder" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockFolders.map((folder) => (
                          <SelectItem key={folder.id} value={folder.id}>
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fileName">File Name</Label>
                    <Input
                      id="fileName"
                      value={uploadForm.fileName}
                      onChange={(e) =>
                        setUploadForm((prev) => ({ ...prev, fileName: e.target.value }))
                      }
                      placeholder="Enter file name"
                      className="border-gray-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Choose File</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={(e) =>
                        setUploadForm((prev) => ({
                          ...prev,
                          file: e.target.files?.[0] || null,
                        }))
                      }
                      className="border-gray-300"
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setUploadDialogOpen(false)}
                      className="flex-1 border-gray-300"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                      Upload
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-black mb-2">Materials & Resources</h2>
          <p className="text-gray-600">Access and share course materials with your communities</p>
        </div>

        {!selectedFolder ? (
          // Folder View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockFolders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Folder className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-black mb-1">{folder.name}</h3>
                    <p className="text-sm text-gray-500">
                      {folder.files.length} {folder.files.length === 1 ? 'file' : 'files'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          // Files View
          <div>
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setSelectedFolder(null)}
                className="mb-4 border-gray-300"
              >
                ← Back to Folders
              </Button>
              <h3 className="text-xl font-semibold text-black">
                {mockFolders.find((f) => f.id === selectedFolder)?.name}
              </h3>
            </div>

            <div className="space-y-3">
              {mockFolders
                .find((f) => f.id === selectedFolder)
                ?.files.map((file) => (
                  <div
                    key={file.id}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-black mb-1">{file.name}</h4>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                          <span>Uploaded by {file.uploader}</span>
                          <span>•</span>
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>{file.uploadDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {renderStars(file.rating)}
                            <span className="text-xs text-gray-500">({file.ratingCount})</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(file.name)}
                            className="border-gray-300 text-gray-700 hover:bg-gray-100"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <BottomNav />

      {/* Single Alert Dialog with Dynamic Content */}
      <AlertDialog open={alertType !== null} onOpenChange={() => setAlertType(null)}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <div className="flex flex-col items-center gap-3">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  alertType === 'upload-success' || alertType === 'download-success'
                    ? 'bg-green-100'
                    : 'bg-red-100'
                }`}
              >
                {alertType === 'upload-success' || alertType === 'download-success' ? (
                  <CheckCircle className="w-10 h-10 text-green-600" />
                ) : (
                  <XCircle className="w-10 h-10 text-red-600" />
                )}
              </div>
              <AlertDialogTitle className="text-center">
                {alertType === 'upload-success' && 'Upload Successful!'}
                {alertType === 'upload-error' && 'Upload Unsuccessful'}
                {alertType === 'download-success' && 'Document Downloaded'}
                {alertType === 'download-error' && 'Document Unable to Download'}
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-center">
              {alertType === 'upload-success' &&
                'Your file has been successfully uploaded and is now available to your community members.'}
              {alertType === 'upload-error' &&
                'There was an error uploading your file. This could be due to network issues, file size limits, or server problems. Please try again.'}
              {alertType === 'download-success' &&
                'Your document has been successfully downloaded and saved to your device.'}
              {alertType === 'download-error' &&
                'There was an error downloading the document. This could be due to network connectivity, file availability, or permission issues. Please try again.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-2">
            {alertType === 'upload-success' || alertType === 'download-success' ? (
              <AlertDialogAction
                onClick={() => setAlertType(null)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Close
              </AlertDialogAction>
            ) : (
              <>
                <AlertDialogCancel onClick={() => setAlertType(null)} className="border-gray-300">
                  Close
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={alertType === 'upload-error' ? handleTryAgain : () => setAlertType(null)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Try Again
                </AlertDialogAction>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
