-- ============================================
-- LevelUp - Database Initialization
-- CPSC 2221 - Milestone 4
-- ============================================

USE level_up;

-- ============================================
-- table
-- ============================================

CREATE TABLE User (
    UserID INTEGER PRIMARY KEY,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Username VARCHAR(50)  UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    DateJoined  DATE,
    Availability VARCHAR(50)
);

CREATE TABLE FriendShip (
    UserID INTEGER,
    FriendID INTEGER,
    PRIMARY KEY (UserID, FriendID),
    FOREIGN KEY (UserID)   REFERENCES User(UserID) ON DELETE CASCADE,
    FOREIGN KEY (FriendID) REFERENCES User(UserID) ON DELETE CASCADE
);

CREATE TABLE Admin (
    UserID INTEGER PRIMARY KEY,
    Permission VARCHAR(100),
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);

CREATE TABLE Admin_Manages_User (
    UserID INTEGER PRIMARY KEY,
    User_ManagedID INTEGER,
    FOREIGN KEY (UserID)         REFERENCES User(UserID) ON DELETE CASCADE,
    FOREIGN KEY (User_ManagedID) REFERENCES User(UserID) ON DELETE SET NULL
);

CREATE TABLE Game (
    GameID INTEGER PRIMARY KEY,
    Genre VARCHAR(50),
    Title VARCHAR(100),
    PublishedDate DATE
);

CREATE TABLE Community (
    CommunityID INTEGER PRIMARY KEY,
    GameID INTEGER,
    Name VARCHAR(100),
    Description VARCHAR(255),
    FOREIGN KEY (GameID) REFERENCES Game(GameID) ON DELETE CASCADE
);

CREATE TABLE Moderator (
    UserID INTEGER PRIMARY KEY,
    AssignedCommunity INTEGER,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    FOREIGN KEY (AssignedCommunity) REFERENCES Community(CommunityID) ON DELETE SET NULL
);

CREATE TABLE Game_Contains_Character (
    GameID INTEGER,
    CharacterName VARCHAR(100),
    Stats VARCHAR(255),
    PRIMARY KEY (GameID, CharacterName),
    FOREIGN KEY (GameID) REFERENCES Game(GameID) ON DELETE CASCADE
);

CREATE TABLE User_Plays_Game (
    UserID INTEGER,
    GameID INTEGER,
    Device VARCHAR(50),
    PRIMARY KEY (UserID, GameID),
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    FOREIGN KEY (GameID) REFERENCES Game(GameID) ON DELETE CASCADE
);

CREATE TABLE User_Game_Has_Community (
    UserID INTEGER,
    CommunityID INTEGER,
    PRIMARY KEY (UserID, CommunityID),
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    FOREIGN KEY (CommunityID) REFERENCES Community(CommunityID) ON DELETE CASCADE
);

CREATE TABLE Post (
    PostID INTEGER PRIMARY KEY,
    CommunityID INTEGER NOT NULL,
    UserID INTEGER,
    Date_Created DATE,
    Content VARCHAR(500),
    Title VARCHAR(100),
    FOREIGN KEY (CommunityID) REFERENCES Community(CommunityID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE SET NULL
);

-- ============================================
-- mock data
-- ============================================

INSERT INTO User (UserID, Email, Username, Password, DateJoined, Availability) VALUES
(1, 'User1@gmail.com', 'User1', 'Pass1word', '2012-06-15', 'online'),
(2, 'User2@gmail.com', 'User2', 'Pass2word', '2013-01-21', 'offline'),
(3, 'User3@gmail.com', 'User3', 'Pass3word', '2015-09-05', 'online'),
(4, 'User4@gmail.com', 'User4', 'Pass4word', '2015-04-09', 'busy'),
(5, 'User5@gmail.com', 'User5', 'Pass5word', '2017-05-29', 'online');

INSERT INTO FriendShip (UserID, FriendID) VALUES
(1, 2),
(2, 1),
(3, 5),
(4, 3),
(5, 3);

INSERT INTO Admin (UserID, Permission) VALUES
(1, 'CONTROL SERVER'),
(2, NULL),
(3, NULL),
(4, 'CONTROL SERVER'),
(5, NULL);

INSERT INTO Admin_Manages_User (UserID, User_ManagedID) VALUES
(1, 5),
(2, 3),
(3, 2),
(4, 1),
(5, 4);

INSERT INTO Game (GameID, Genre, Title, PublishedDate) VALUES
(36, 'Horror',  'Echoes of the Unspoken',    '2017-12-14'),
(50, 'Action',  'Neon Nexus Protocol',        '2019-11-13'),
(18, 'RPG',     'Bloodline: The Cursed Crown', '2004-08-28'),
(37, 'Sports',  'Hyper-Strike',               '2020-09-21'),
(38, 'Puzzle',  'Whispering Pines Manor',     '2022-12-10');

INSERT INTO Community (CommunityID, GameID, Name, Description) VALUES
(4, 36, 'Super Smashin It',  'The community where everyone fights each other'),
(2, 50, 'Happiest Wheels',   'Just for giggles'),
(1, 18, 'Bald Gate',         'Community for Baldurs Gate 3 enthusiasts'),
(8, 37, 'The Evil Resident', 'Discussing lore and behind the scenes'),
(6, 38, 'Fortnight',         'Just a bunch of delinquents');

INSERT INTO Moderator (UserID, AssignedCommunity) VALUES
(1, 4),
(2, 2),
(3, 1),
(4, 8),
(5, 6);

INSERT INTO Game_Contains_Character (GameID, CharacterName, Stats) VALUES
(36, 'Ash Ketchum',     'Charisma, Intelligence'),
(50, 'Leon S. Kennedy', 'Strength, Dexterity'),
(18, 'Zelda',           'Constitution, Dexterity'),
(37, 'Mario',           'Dexterity'),
(38, 'Lara Croft',      'Intelligence, Dexterity, Strength');

INSERT INTO User_Plays_Game (UserID, GameID, Device) VALUES
(1, 36, 'switch'),
(2, 50, 'ps5'),
(3, 18, 'xbox'),
(4, 37, 'DS'),
(5, 38, 'switch2');

INSERT INTO User_Game_Has_Community (UserID, CommunityID) VALUES
(1, 4),
(2, 2),
(3, 1),
(4, 8),
(5, 6);

INSERT INTO Post (PostID, CommunityID, UserID, Date_Created, Content, Title) VALUES
(1, 4, 4, '2024-09-07', 'tips',   'tip for this field'),
(2, 2, 2, '2022-08-09', 'item',   'I found this item'),
(3, 1, 3, '2019-10-03', 'advice', 'Anyone stuck here?'),
(4, 8, 4, '2021-09-04', 'item',   'Where do I use this?'),
(5, 6, 1, '2022-08-09', 'help',   'stuck on this quest');