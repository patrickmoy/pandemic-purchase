DROP TABLE IF EXISTS Members;
CREATE TABLE Members (MemberID SERIAL PRIMARY KEY,
                      Username VARCHAR(255) NOT NULL UNIQUE,
                      Email VARCHAR(255) NOT NULL UNIQUE,
                      Password VARCHAR(255) NOT NULL,
                      SALT VARCHAR(255),
                      Verification INT DEFAULT 0
);

DROP TABLE IF EXISTS Lookups;
CREATE TABLE Lookups (LookupID SERIAL PRIMARY KEY,
                      Name VARCHAR(255) NOT NULL,
                      Link VARCHAR(255) NOT NULL UNIQUE,
                      Vendor VARCHAR(255) NOT NULL,
                      Type VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS Keywords;
CREATE TABLE Items (KeyPairID SERIAL PRIMARY KEY,
                    LookupID INT NOT NULL,
                    Keyword VARCHAR(255) NOT NULL,
                    FOREIGN KEY(LookupID) REFERENCES Lookups(LookupID)
);

DROP TABLE IF EXISTS Items;
CREATE TABLE Items (ItemID SERIAL PRIMARY KEY,
                    ItemName VARCHAR(255) NOT NULL UNIQUE,
                    LookupID INT NOT NULL,
                    FOREIGN KEY(LookupID) REFERENCES Lookups(LookupID)
);

DROP TABLE IF EXISTS Test;
CREATE TABLE Test (TestID SERIAL PRIMARY KEY,
                   Data INT NOT NULL
);


