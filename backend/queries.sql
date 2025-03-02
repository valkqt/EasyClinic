DROP DATABASE IF EXISTS EasyClinicLocal;
CREATE DATABASE EasyClinicLocal;

CREATE TABLE Patients (
    Id int NOT NULL IDENTITY(1,1),
    FirstName nvarchar(255) NOT NULL,
    FiscalCode nvarchar(16) NOT NULL,
    DateOfBirth datetime2 NOT NULL,
    CreatedAt datetime2 NOT NULL,
    Photo nvarchar(255),
    Gender int NOT NULL,
    LastName nvarchar(255) NOT NULL,
    CONSTRAINT CHK_Gender CHECK (Gender >=0 AND Gender <= 2),
    CONSTRAINT PK_Patient PRIMARY KEY (Id)
);

CREATE TABLE Examinations (
    Id int NOT NULL IDENTITY(1,1),
    DateTime datetime2 NOT NULL,
    Anamnesis nvarchar(max) NOT NULL,
    Motivation int NOT NULL,
    Category int NOT NULL,
    PatientId int NOT NULL,
    PRIMARY KEY (Id),
    CONSTRAINT FK_PatientExamination FOREIGN KEY (PatientId) REFERENCES Patients(Id),
    CONSTRAINT CHK_Motivation CHECK (Motivation >= 0 AND Motivation <= 2),
    CONSTRAINT CHK_Category CHECK (Category >= 0 AND Motivation <= 1),
);

INSERT INTO Patients VALUES 
('John', 'JD85F1234P', '1985-02-15', '2025-02-01 08:45:30', null, 0, 'Doe'),
('Emma', 'ES92G5678T', '1992-11-03', '2025-01-20 09:30:15', null, 1, 'Smith'),
('Luca', 'JD85F1234P', '1988-06-25', '2025-02-10 12:05:47', null, 0, 'Rossi'),
('Anna', 'JD85F1234P', '1995-07-19', '2025-02-15 14:22:56', null, 1, 'Bianchi'),
('Marco', 'JD85F1234P', '1979-04-05', '2025-01-28 10:15:03', null, 0, 'Verdi'),
('Sofia', 'JD85F1234P', '2000-09-11', '2025-02-18 16:45:22', null, 1, 'Neri');

INSERT INTO Examinations VALUES 
    ('2025-02-26 14:30:00', 'Routine blood test', 0, 0, 1),
    ('2025-02-25 09:00:00', 'Chest X-ray for cough symptoms', 1, 0, 1),
    ('2025-02-24 10:15:00', 'ECG for irregular heartbeats', 0, 1, 2),
    ('2025-02-23 11:45:00', 'MRI scan of the brain', 1, 1, 2),
    ('2025-02-26 14:30:00', 'Ultrasound of the abdomen for pain assessment', 0, 0, 3),
    ('2025-02-25 09:00:00', 'Follow-up consultation for post-surgery recovery', 1, 0, 3),
    ('2025-02-24 10:15:00', 'Spirometry for asthma management', 0, 1, 4),
    ('2025-02-23 11:45:00', 'Skin biopsy for suspicious mole', 1, 1, 4),
    ('2025-02-26 14:30:00', 'Hearing test for auditory concerns', 0, 0, 5),
    ('2025-02-25 09:00:00', 'MRI scan of the spine for chronic back pain', 1, 0, 5),
    ('2025-02-24 10:15:00', 'Colonoscopy for colorectal cancer screening', 0, 1, 6),
    ('2025-02-23 11:45:00', 'CT scan of the chest for persistent cough', 1, 1, 6);