# Pages




### DLL

CREATE TYPE user_status_enum AS ENUM (
    'active',
    'inactive',
    'banned'
);

CREATE TYPE session_status_enum AS ENUM (
    'pending',
    'in_progress',
    'completed',
    'abandoned'
);

//=================================


CREATE TABLE language (
    id_language INT         GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    language    VARCHAR(50) NOT NULL UNIQUE,
    created_at  TIMESTAMP   NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP
);

CREATE TABLE level (
    id_level   INT          GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    level      VARCHAR(50)  NOT NULL UNIQUE,
    order_num  INT          NOT NULL UNIQUE,
    created_at TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);



//================



CREATE TABLE "user" (
    id_user      UUID             NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_name    VARCHAR(100)     NOT NULL UNIQUE,
    email        VARCHAR(150)     NOT NULL UNIQUE,
    password     VARCHAR(255)     NOT NULL,
    user_status  user_status_enum NOT NULL DEFAULT 'active',
    id_language  INT              NOT NULL,
    id_level     INT,                          -- punto 1: nivel actual calculado desde score_global
    created_at   TIMESTAMP        NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP,
    CONSTRAINT fk_user_language FOREIGN KEY (id_language) REFERENCES language (id_language),
    CONSTRAINT fk_user_level    FOREIGN KEY (id_level)    REFERENCES level (id_level)
);


CREATE TABLE profile (
    id_profile         INT           GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_user            UUID          NOT NULL UNIQUE,
    photo_url          VARCHAR(500),
    created_at         TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMP,
    CONSTRAINT fk_profile_user FOREIGN KEY (id_user) REFERENCES "user" (id_user)
);

//=================================


CREATE TABLE question (
    id_question   INT                GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_topic      INT                NOT NULL,
    id_level      INT                NOT NULL,
    level_assign varchar(40) not NULL,
    created_at    TIMESTAMP          NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP,
    CONSTRAINT fk_question_topic    FOREIGN KEY (id_topic)    REFERENCES topic (id_topic),
    CONSTRAINT fk_question_level    FOREIGN KEY (id_level)    REFERENCES level (id_level)
);



CREATE TABLE answer_option (
    id_answer_option INT          GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_question      INT          NOT NULL,
    option_text      text NOT NULL,
    is_correct       BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at       TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMP,
    CONSTRAINT fk_answer_option_question FOREIGN KEY (id_question) REFERENCES question (id_question)
);


CREATE TABLE interview_session (
    id_session     INT                 GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_user        UUID                NOT NULL,
    id_topic       INT                 NOT NULL,    -- punto 3
    id_level       INT                 NOT NULL,    -- punto 3
    session_status session_status_enum NOT NULL DEFAULT 'pending',
    date_ini       TIMESTAMP           NOT NULL DEFAULT NOW(),
    date_fin       TIMESTAMP,
    CONSTRAINT fk_session_user  FOREIGN KEY (id_user)  REFERENCES "user" (id_user),
    CONSTRAINT fk_session_topic FOREIGN KEY (id_topic) REFERENCES topic (id_topic),
    CONSTRAINT fk_session_level FOREIGN KEY (id_level) REFERENCES level (id_level)
);



CREATE TABLE question_instance (
    id_question_instance INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_session           INT NOT NULL,
    id_question          INT NOT NULL,
    order_num            INT NOT NULL,
    CONSTRAINT fk_qi_session  FOREIGN KEY (id_session)  REFERENCES interview_session (id_session),
    CONSTRAINT fk_qi_question FOREIGN KEY (id_question) REFERENCES question (id_question),
    CONSTRAINT uq_qi_session_order    UNIQUE (id_session, order_num),
    CONSTRAINT uq_qi_session_question UNIQUE (id_session, id_question)
);





-- ============



CREATE TABLE question_answered (
    id_question_answered     INT           GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_question_instance     INT           NOT NULL UNIQUE,
    id_user                  UUID          NOT NULL,    -- punto 4
    id_answer_option         INT,                       -- punto 5: opcional para multiple_choice y true_false
    answer                   VARCHAR(5000),
    score                    NUMERIC(5,2)  CONSTRAINT chk_qa_score CHECK (score >= 0 AND score <= 100),
    feedback                 VARCHAR(2000),
    transcription_confidence NUMERIC(4,3)  CONSTRAINT chk_qa_confidence CHECK (transcription_confidence >= 0 AND transcription_confidence <= 1),
    is_transcription_valid   BOOLEAN,
    transcription_service    VARCHAR(50),
    answered_at              TIMESTAMP     NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_qa_question_instance FOREIGN KEY (id_question_instance) REFERENCES question_instance (id_question_instance),
    CONSTRAINT fk_qa_user              FOREIGN KEY (id_user)              REFERENCES "user" (id_user),
    CONSTRAINT fk_qa_answer_option     FOREIGN KEY (id_answer_option)     REFERENCES answer_option (id_answer_option)
);



-- =========================


CREATE TABLE user_topic_progress (
    id_progress   INT          GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_user       UUID         NOT NULL,
    id_topic      INT          NOT NULL,
    is_unlocked   BOOLEAN      NOT NULL DEFAULT FALSE,
    is_completed  BOOLEAN      NOT NULL DEFAULT FALSE,
    score_best    NUMERIC(5,2) CONSTRAINT chk_utp_score CHECK (score_best >= 0 AND score_best <= 100),
    attempt_count INT          NOT NULL DEFAULT 0,     -- punto 6
    last_attempt  TIMESTAMP,
    CONSTRAINT fk_utp_user  FOREIGN KEY (id_user)  REFERENCES "user" (id_user),
    CONSTRAINT fk_utp_topic FOREIGN KEY (id_topic) REFERENCES topic (id_topic),
    CONSTRAINT uq_utp_user_topic UNIQUE (id_user, id_topic)
);
	

==========================================
 

CREATE TABLE question_translation (
    id_question_translation INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_question  INT NOT NULL,
    id_language  INT NOT NULL,
    question_text text NOT NULL,
    created_at   TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP,

    CONSTRAINT fk_qt_question FOREIGN KEY (id_question)
        REFERENCES question (id_question)
        ON DELETE CASCADE,

    CONSTRAINT fk_qt_language FOREIGN KEY (id_language)
        REFERENCES language (id_language)

);