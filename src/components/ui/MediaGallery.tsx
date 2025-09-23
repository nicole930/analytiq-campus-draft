'use client';

import { useState } from 'react';
import { MediaItem } from '@/types/athlete';

interface MediaGalleryProps {
  media: MediaItem[];
  athleteName: string;
}

export default function MediaGallery({ media, athleteName }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'photo' | 'video' | 'highlight'>('all');

  const filteredMedia = selectedType === 'all'
    ? media
    : media.filter(item => item.type === selectedType);

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'photo':
        return '📸';
      case 'video':
        return '🎥';
      case 'highlight':
        return '⭐';
      default:
        return '📎';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const MediaModal = ({ item, onClose }: { item: MediaItem; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">{formatDate(item.date)}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-4">
          {item.type === 'photo' ? (
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
            />
          ) : (
            <div className="relative">
              <video
                controls
                className="w-full h-auto max-h-[60vh] rounded-lg"
                poster={item.thumbnail}
              >
                <source src={item.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {item.description && (
            <div className="mt-4">
              <p className="text-gray-700">{item.description}</p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (!media || media.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📁</div>
        <p className="text-gray-600">No media available for {athleteName}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        {[
          { key: 'all', label: 'All Media', count: media.length },
          { key: 'photo', label: 'Photos', count: media.filter(m => m.type === 'photo').length },
          { key: 'video', label: 'Videos', count: media.filter(m => m.type === 'video').length },
          { key: 'highlight', label: 'Highlights', count: media.filter(m => m.type === 'highlight').length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedType(tab.key as any)}
            className={`pb-2 px-1 font-medium text-sm transition-colors ${
              selectedType === tab.key
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-100 aspect-video"
            onClick={() => setSelectedMedia(item)}
          >
            <img
              src={item.thumbnail || item.url}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-3xl">
                  {item.type === 'photo' ? '🔍' : '▶️'}
                </span>
              </div>
            </div>

            {/* Type indicator */}
            <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <span>{getMediaIcon(item.type)}</span>
              <span className="capitalize">{item.type}</span>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
              <p className="text-white text-sm font-medium line-clamp-2">
                {item.title}
              </p>
              <p className="text-gray-300 text-xs">
                {formatDate(item.date)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredMedia.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-600">
            No {selectedType === 'all' ? 'media' : selectedType + 's'} found
          </p>
        </div>
      )}

      {/* Media Modal */}
      {selectedMedia && (
        <MediaModal
          item={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </div>
  );
}