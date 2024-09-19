export interface CourseInfo {
  name: string;
  description: string;
  price: string | number;
  estimatedPrice: string | number;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: any;
}

export interface CourseContentDataProps {
    videoUrl: string;
    title: string;
    description: string;
    videoSection: string;
    links:
        {
            title: string;
            url: string;
        }[];
    suggestion: string;
}