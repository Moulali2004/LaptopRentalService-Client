export interface Review {
    id: string;
    laptopId: string;
    userId: UserReview;
    rating: number;
    comment: string;
    date: string;
}

export interface ReviewsResponse {
    reviews: Review[];
}

export interface UserReview {
    id: string;
    fullname: string;
}