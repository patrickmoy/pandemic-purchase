DROP TABLE IF EXISTS Lookups;
CREATE TABLE Lookups (LookupID SERIAL PRIMARY KEY,
                      Name VARCHAR(255) NOT NULL,
                      Link VARCHAR(255) NOT NULL UNIQUE,
                      Vendor VARCHAR(255) NOT NULL,
                      Type VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS Keywords;
CREATE TABLE Keywords (KeyPairID SERIAL PRIMARY KEY,
                    LookupID INT NOT NULL,
                    Keyword VARCHAR(255) NOT NULL,
                    FOREIGN KEY(LookupID) REFERENCES Lookups(LookupID)
);

DROP TABLE IF EXISTS Items;
CREATE TABLE Items (ItemID SERIAL PRIMARY KEY,
                    Name VARCHAR(255) NOT NULL UNIQUE,
                    Price VARCHAR(255) NOT NULL,
                    InStock INT NOT NULL,
                    LookupID INT NOT NULL,
                    FOREIGN KEY(LookupID) REFERENCES Lookups(LookupID)
);

DROP TABLE IF EXISTS Notifications
CREATE TABLE Notifications (NotificationID SERIAL PRIMARY KEY,
                            ItemID INT NOT NULL,
                            FOREIGN KEY (ItemID) REFERENCES Items(ItemID)
);

INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue Calibrated KG Steel Plates', 'https://www.roguefitness.com/rogue-calibrated-kg-steel-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue Calibrated LB Steel Plates', 'https://www.roguefitness.com/rogue-calibrated-lb-steel-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue LB Competition Plates', 'https://www.roguefitness.com/rogue-competition-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue KG Competition Plates', 'https://www.roguefitness.com/rogue-kg-competition-plates-iwf', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue HG 2.0 Plates', 'https://www.roguefitness.com/rogue-hg-2-0-bumper-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue KG Bumper Plates', 'https://www.roguefitness.com/kg-rogue-bumpers', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue USMIL Bumper Plates', 'https://www.roguefitness.com/rogue-us-mil-sprc-bumper-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue KG Striped Training Plates', 'https://www.roguefitness.com/rogue-black-training-kg-striped-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue LB Striped Training Plates', 'https://www.roguefitness.com/rogue-black-training-lb-color-stripe-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue LB Color Training Plates', 'https://www.roguefitness.com/rogue-color-lb-training-2-0-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue KG Color Training Plates', 'https://www.roguefitness.com/rogue-color-kg-training-2-0-plates-iwf', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue Hi-Temp Plates', 'https://www.roguefitness.com/rogue-hi-temp-bumper-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue LB Training 2.0 Plates', 'https://www.roguefitness.com/rogue-lb-training-2-0-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue KG Training 2.0 Plates', 'https://www.roguefitness.com/rogue-kg-training-2-0-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue LB Training 2.0 WP Plates', 'https://www.roguefitness.com/rogue-lb-training-2-0-plates-white-print', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue Fleck Plates', 'https://www.roguefitness.com/rogue-fleck-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue V2 Echo Plates', 'https://www.roguefitness.com/rogue-echo-bumper-plates-with-white-text', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue V1 Echo Plates', 'https://www.roguefitness.com/rogue-echo-bumper-plates-with-white-text-v1', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue USMIL Echo Plates', 'https://www.roguefitness.com/rogue-mil-echo-bumper-plates-black', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue Color Echo Plates', 'https://www.roguefitness.com/rogue-color-echo-bumper-plate', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue Hi-Temp Competition Plates', 'https://www.roguefitness.com/rogue-hi-temp-competition-training-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue Urethane Plates', 'https://www.roguefitness.com/rogue-urethane-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue 6 Shooter Plates', 'https://www.roguefitness.com/rogue-6-shooter-olympic-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue 6 Shooter Urethane Plates', 'https://www.roguefitness.com/rogue-6-shooter-urethane-olympic-grip-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue Olympic Plates', 'https://www.roguefitness.com/rogue-olympic-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue 12-Side Urethane Plates', 'https://www.roguefitness.com/rogue-12-sided-urethane-grip-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue Machined Plates', 'https://www.roguefitness.com/rogue-machined-olympic-plates', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue Urethane Dumbbells', 'https://www.roguefitness.com/rogue-urethane-dumbbells-new', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue Dumbbells', 'https://www.roguefitness.com/rogue-dumbbells', 'Rogue', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue Flat Utility Bench', 'https://www.roguefitness.com/rogue-flat-utility-bench', 'Rogue', 'single');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue Bolt Bench', 'https://www.roguefitness.com/rogue-bt-bench', 'Rogue', 'single');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rogue AB-2 Bench', 'https://www.roguefitness.com/ab-2-adjustable-bench', 'Rogue', 'single');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Titan Urethane Dumbbells', 'https://www.titan.fitness/strength/dumbbells/urethane/urethane-dumbbells-%7C-5---120-lb-%7C-pair/URDMBL_GROUP.html', 'Titan', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Titan Adjustable Chrome Dumbbells', 'https://www.titan.fitness/strength/dumbbells/adjustable-dumbbells/pair-of-adjustable-chrome-dumbbells-5-100-lb-each/423113.html', 'Titan', 'single');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Titan LB Change Plates ', 'https://www.titan.fitness/strength/weight-plates/specialty-plates/change-plates-%7C-lb/CHBUMP_GROUP.html', 'Titan', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Titan Color Elite Bumper Plates', 'https://www.titan.fitness/strength/weight-plates/bumper-plates/elite-olympic-bumper-plates-%7C-color-%7C-lb/ECBUMP_GROUP.html', 'Titan', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Titan Cast Iron Plates', 'https://www.titan.fitness/strength/weight-plates/cast-iron-plates/cast-iron-olympic-weight-plates/CPLATE_GROUP.html', 'Titan', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Titan Black Elite Bumper Plates', 'https://www.titan.fitness/strength/weight-plates/bumper-plates/elite-olympic-bumper-plates-%7C-black-%7C-lb/EBBUMP_GROUP.html', 'Titan', 'multiple');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Titan Weight Tree', 'https://www.titan.fitness/organize/freestanding-storage/weight-plates/portable-plate-and-barbell-storage-tree/400886.2.html', 'Titan', 'single');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Titan T-3 Short Stand', 'https://www.titan.fitness/racks/squat-stands/t-3-series/t-3-series-short-squat-stand-with-j-hooks/400925.2.html', 'Titan', 'single');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Titan Flat Bench', 'https://www.titan.fitness/strength/benches/flat-weight-bench/400201.2.html', 'Titan', 'single');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rep Plate Tree', 'https://www.repfitness.com/bars-plates/storage/plates/bar-and-bumper-plate-tree', 'Rep', 'single');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rep PR-1000 Rack', 'https://www.repfitness.com/strength-equipment/power-racks/rep-power-rack', 'Rep', 'single');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rep PR-1050 Rack', 'https://www.repfitness.com/strength-equipment/power-racks/rep-pr-1050', 'Rep', 'single');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rep GHD', 'https://www.repfitness.com/strength-equipment/strength-training/rep-ghd', 'Rep', 'single');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rep PR-1100 Rack', 'https://www.repfitness.com/strength-equipment/rep-pr-1100', 'Rep', 'single');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rep 14-Barbell Rack', 'https://www.repfitness.com/strength-equipment/rep-commercial-14-barbell-rack', 'Rep', 'single');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rep SS Power Bar', 'https://www.repfitness.com/bars-plates/olympic-bars/rep-stainless-steel-power-bar', 'Rep', 'single');
INSERT INTO Lookups (Name, Link, Vendor, Type) VALUES (' Rep Power Speed Bar', 'https://www.repfitness.com/bars-plates/olympic-bars/powerspeed-bar', 'Rep', 'single');

INSERT INTO Keywords(LookupID, Keyword) VALUES (1, 'steel calibrated plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (2, 'steel calibrated plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (3, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (4, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (5, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (6, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (7, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (8, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (9, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (10, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (11, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (12, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (13, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (14, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (15, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (16, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (17, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (18, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (19, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (20, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (21, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (22, 'coated plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (23, 'iron plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (24, 'coated plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (25, 'iron plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (26, 'coated plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (27, 'iron plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (28, 'dumbbell');
INSERT INTO Keywords(LookupID, Keyword) VALUES (29, 'dumbbell');
INSERT INTO Keywords(LookupID, Keyword) VALUES (30, 'bench');
INSERT INTO Keywords(LookupID, Keyword) VALUES (31, 'bench');
INSERT INTO Keywords(LookupID, Keyword) VALUES (32, 'bench');
INSERT INTO Keywords(LookupID, Keyword) VALUES (33, 'dumbbell');
INSERT INTO Keywords(LookupID, Keyword) VALUES (34, 'dumbbell');
INSERT INTO Keywords(LookupID, Keyword) VALUES (35, 'coated plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (36, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (37, 'iron plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (38, 'bumper plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (39, 'tree');
INSERT INTO Keywords(LookupID, Keyword) VALUES (40, 'rack stand');
INSERT INTO Keywords(LookupID, Keyword) VALUES (41, 'bench');
INSERT INTO Keywords(LookupID, Keyword) VALUES (42, 'plate');
INSERT INTO Keywords(LookupID, Keyword) VALUES (43, 'rack');
INSERT INTO Keywords(LookupID, Keyword) VALUES (44, 'rack');
INSERT INTO Keywords(LookupID, Keyword) VALUES (45, 'ghd');
INSERT INTO Keywords(LookupID, Keyword) VALUES (46, 'rack');
INSERT INTO Keywords(LookupID, Keyword) VALUES (47, 'rack');
INSERT INTO Keywords(LookupID, Keyword) VALUES (48, 'bar');
INSERT INTO Keywords(LookupID, Keyword) VALUES (49, 'bar');
