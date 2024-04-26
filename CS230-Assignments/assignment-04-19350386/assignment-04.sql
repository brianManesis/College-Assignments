
DROP TABLE IF EXISTS CustomerAddresses;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Address;

CREATE TABLE Customer( 
  CustomerID INT NOT NULL AUTO_INCREMENT,
  Title VARCHAR(4),
  FirstName VARCHAR(30) NOT NULL ,
  LastName VARCHAR(30) NOT NULL , 
  Mobile VARCHAR(15) NOT NULL ,
  EmailAddress VARCHAR(30) NOT NULL , 
  PRIMARY KEY (CustomerID)
);

CREATE TABLE Address( 
  AddressID INT NOT NULL AUTO_INCREMENT,
  Address_Line_1 VARCHAR(60) NOT NULL ,
  Address_Line_2 VARCHAR(60) , 
  Town VARCHAR(20) NOT NULL ,
  County_City VARCHAR(30) NOT NULL , 
  Eircode VARCHAR(10),
  PRIMARY KEY (AddressID)
);

CREATE TABLE CustomerAddresses( 
  CustomerID INT NOT NULL,
  AddressID INT NOT NULL, 
  isShipping TINYINT NOT NULL,
  PRIMARY KEY (CustomerID, AddressID),
  FOREIGN KEY(CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE,
  FOREIGN KEY(AddressID) REFERENCES Address(AddressID) ON DELETE CASCADE
);

/*Customer 1*/
INSERT INTO Customer (Title, FirstName, LastName, Mobile, EmailAddress) VALUES ("Mr", "Brian", "Manesis", "0831316281", "manesisbrian@gmail.com");
INSERT INTO Address (Address_Line_1, Address_Line_2, Town, County_City, Eircode) VALUES ("27 corbally heath", "Citywest", "Dublin", "Dublin", "D25 NWT5");
INSERT INTO CustomerAddresses (CustomerID,AddressID,isShipping) VALUES (1,1,1);

/*Customer 2*/
INSERT INTO Customer (Title, FirstName, LastName, Mobile, EmailAddress) VALUES ("Dr", "Ryan", "Murphy", "0844630522", "ryan@gmail.com");
INSERT INTO Address (Address_Line_1, Address_Line_2, Town, County_City, Eircode) VALUES ("2 corbally rise", NULL, "Dublin", "Dublin", "D25 HG65");
INSERT INTO Address (Address_Line_1, Address_Line_2, Town, County_City, Eircode) VALUES ("27 rath moore", NULL, "Castletown", "Wexford", "W23 NRUQ");
INSERT INTO CustomerAddresses (CustomerID,AddressID,isShipping) VALUES ("2","2",0);
INSERT INTO CustomerAddresses (CustomerID,AddressID,isShipping) VALUES ("2","3",1);

/*Customer 3*/
INSERT INTO Customer (Title, FirstName, LastName, Mobile, EmailAddress) VALUES ("Mrs", "Katie", "Higgins", "0879458294", "katieH@gmail.com");
INSERT INTO Address (Address_Line_1, Address_Line_2, Town, County_City, Eircode) VALUES ("15 west park", "Templeogue", "Dublin", "Dublin", "D14 JHSA");
INSERT INTO Address (Address_Line_1, Address_Line_2, Town, County_City, Eircode) VALUES ("1 norfolk road", NULL, "Kinstown", "West Meath", NULL);
INSERT INTO CustomerAddresses (CustomerID,AddressID,isShipping) VALUES ("3","4",0);
INSERT INTO CustomerAddresses (CustomerID,AddressID,isShipping) VALUES ("3","5",1);

/*Customer 4*/
INSERT INTO Customer (Title, FirstName, LastName, Mobile, EmailAddress) VALUES ("Miss", "Aoife", "Harrison", "0861218536", "aoifeHarr@yahoo.com");
INSERT INTO Address (Address_Line_1, Address_Line_2, Town, County_City, Eircode) VALUES ("9 dreary avenue", NULL, "Kings Village", "Belfast", "B45 NJDK");
INSERT INTO CustomerAddresses (CustomerID,AddressID,isShipping) VALUES (4,6,1);

/*Customer 5*/
INSERT INTO Customer (Title, FirstName, LastName, Mobile, EmailAddress) VALUES ("Mrs", "Aoife", "O'Leary", "0847301273", "aoifeO@gmail.com");
INSERT INTO Address (Address_Line_1, Address_Line_2, Town, County_City, Eircode) VALUES ("4 clear road", "DrueTown", "ValleyTown", "Cardiff", "C75 JDFO");
INSERT INTO Address (Address_Line_1, Address_Line_2, Town, County_City, Eircode) VALUES ("9 westpark avenue", NULL, "Kings Village", "Belfast", NULL);
INSERT INTO CustomerAddresses (CustomerID,AddressID,isShipping) VALUES ("5","7",0);
INSERT INTO CustomerAddresses (CustomerID,AddressID,isShipping) VALUES ("5","8",1);

