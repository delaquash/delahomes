export interface CourseInfo {
  name: string;
  description: string;
  price: string | number;
  estimatedPrice: string | number;
  tags: string;
  level: string;
  categories: string;
  demoUrl: string;
  thumbnail: any;
}

export interface CourseContentDataProps {
    videoUrl: string;
    title: string;
    description: string;
    videoSection: string;
    videoLength?: number |  string;
    suggestion?: string;
    links:
        {
            title: string;
            url: string;
        }[];
    
}