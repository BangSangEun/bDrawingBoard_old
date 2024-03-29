CREATE TABLE bDrawingBoard.MEMBER (
  MEMBER_ID VARCHAR (50) PRIMARY KEY NOT NULL,
  MEMBER_PW VARCHAR (50),
  MEMBER_NAME VARCHAR (50),
  MEMBER_EMAIL VARCHAR (100),
  USE_YN VARCHAR (1)
);

CREATE SEQUENCE SEQ_FILE_ID;
CREATE TABLE bDrawingBoard.MYFILE_INFO
(
    FILE_ID BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    MEMBER_ID VARCHAR(50),
    FILE_NAME VARCHAR(100),
    FILE_URL CLOB,
    FILE_DATA CLOB,
    REGI_DATE VARCHAR(20)
);

INSERT INTO bDrawingBoard.MEMBER (
  MEMBER_ID
  ,MEMBER_PW
  ,MEMBER_NAME
  ,MEMBER_EMAIL
  ,USE_YN
)
VALUES (
  'sebang'
  ,'1111'
  ,'방상은'
  ,'sebang@hancom.com'
  ,'Y'
);
