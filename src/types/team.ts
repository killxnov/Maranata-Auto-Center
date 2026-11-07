export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  illustrative?: boolean;
}
