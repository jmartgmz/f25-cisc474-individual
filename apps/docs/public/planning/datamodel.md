erDiagram
    USER {
        string id
        string email
        string password
        string firstName
        string lastName
        string role
    }
    
    COURSE {
        string id
        string title
        string description
        string status
        datetime startDate
        datetime endDate
        string instructorId
    }
    
    ASSIGNMENT {
        string id
        string title
        string description
        datetime dueDate
        int maxPoints
        string courseId
        datetime createdAt
    }
    
    SUBMISSION {
        string id
        string status
        int score
        string feedback
        string studentId
        string assignmentId 
        datetime submittedAt
    }
    
    GRADE {
        string id
        string studentId
        string assignmentId
        int score
        string feedback
        datetime gradedAt
    }
    
    
    USER ||--o{ COURSE : "instructs"
    USER ||--o{ SUBMISSION : "submits"
    USER ||--o{ GRADE : "receives"
    
    COURSE ||--o{ ASSIGNMENT : "contains"
    
    ASSIGNMENT ||--o{ SUBMISSION : "receives"
    ASSIGNMENT ||--o{ GRADE : "graded for"
    
    SUBMISSION }o--|| USER : "submitted by"
    SUBMISSION }o--|| ASSIGNMENT : "for"
    
    
    GRADE }o--|| USER : "student"
    GRADE }o--|| ASSIGNMENT : "assignment"