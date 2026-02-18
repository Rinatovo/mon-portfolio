import './SimpleGallery.css';

interface GalleryItem {
  id: string;
  img: string;
  height?: number;
}

interface SimpleGalleryProps {
  items: GalleryItem[];
  onImageClick?: (item: GalleryItem) => void;
}

export default function SimpleGallery({ items, onImageClick }: SimpleGalleryProps) {
  return (
    <div className="simple-gallery">
      {items.map((item) => (
        <div
          key={item.id}
          className="gallery-item"
          onClick={() => onImageClick?.(item)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onImageClick?.(item);
            }
          }}
        >
          <img src={item.img} alt={item.id} loading="lazy" />
        </div>
      ))}
    </div>
  );
}
