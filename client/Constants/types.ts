export interface DecodedToken {
    userId: string;
    username: string;
}

export interface AuthContextType {
    auth: string | null;
    userDetails: DecodedToken | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

//SingleTestPage
export interface Option {
    label: string;  // e.g., "a", "b", "c", "d"
    text: string;   // The text of the option, e.g., "4"
}
export interface Question {
    number: number;           // The sequence number of the question
    question: string;         // The text of the question being asked
    options: Option[];        // An array of possible options
    correctAnswer: string;    // The label of the correct answer (e.g., "b")
    photo: string;           // Optional URL to a photo associated with the question
}
export interface Result {
    number: number;
    question: string;
    options: Option[];
    correctAnswer: string;
    givenAnswer: string;
    isRight: boolean;
    photo?: string;
}

//Course
export interface Course {
    is_deleted: boolean;
    courseName: string;
    description: string;
    duration: string;
    photo: string;
    language: [];
    class: string;
    isFree: boolean;
    price: number;
    startDate: Date;
    subjects: []
    students: []
    tests: []
    createdAt: Date;
    updatedAt: Date;
}