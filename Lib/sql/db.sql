

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;



CREATE TABLE public.users (
                              user_id bigint NOT NULL,
                              first_name text NOT NULL,
                              last_name text NOT NULL,
                              email text NOT NULL,
                              pwd text NOT NULL
);

CREATE TABLE public.lesson (
	tutorial_name text NOT null,
    lesson_name text NOT null,
	CONSTRAINT lesson_pk PRIMARY KEY (lesson_name)

);



CREATE TABLE public.tutorial (
	tutorial_name text NOT null,
	CONSTRAINT tutorial_pk PRIMARY KEY (tutorial_name)
);

CREATE TABLE public.lesson_taken (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	lesson_name text NOT NULL,
	user_id int8 NOT NULL,
	"time" varchar(100) NOT NULL,
    time_writing varchar(100) NOT NULL,
	anwser_shown bool NOT NULL,
	backspaces int8 NOT NULL,
    total_chars int8 NOT NULL

	
);

CREATE TABLE public.tries (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	lesson_taken_id int8 NOT NULL,
	"time" varchar(100) NOT NULL,
	backspaces int8 NOT NULL,
    total_chars int8 NOT NULL,
    CONSTRAINT triespk PRIMARY KEY (id)
);





ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
   SEQUENCE NAME public.users_user_id_seq
START WITH 1
         INCREMENT BY 1
          NO MINVALUE
          MAXVALUE 2147483647
         CACHE 1
          );

--
-- Name: users users_un_email; Type: CONSTRAINT; Schema: public; Owner: rsvp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (user_id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_un_email UNIQUE (email);


ALTER TABLE ONLY public.lesson_taken
   ADD CONSTRAINT tutorial_taken_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.lesson_taken
    ADD CONSTRAINT tutorial_takenfk1 FOREIGN KEY (lesson_name) REFERENCES public.lesson(lesson_name);
    
ALTER TABLE ONLY public.lesson_taken
    ADD CONSTRAINT tutorial_takenfk12 FOREIGN KEY (user_id) REFERENCES public.users(user_id);

ALTER TABLE ONLY public.tries
    ADD CONSTRAINT triesfk12 FOREIGN KEY (lesson_taken_id) REFERENCES public.lesson_taken(id);
    
ALTER TABLE ONLY public.lesson
    ADD CONSTRAINT lessonfk12 FOREIGN KEY (tutorial_name) REFERENCES public.tutorial(tutorial_name);


--

INSERT INTO public.tutorial (tutorial_name ) VALUES ('react');
INSERT INTO public.tutorial (tutorial_name ) VALUES ('vue');
INSERT INTO public.tutorial (tutorial_name ) VALUES ('angular');

INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('angular','a1');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('angular','a2');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('angular','a3');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('angular','a4');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('angular','a5');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('angular','a6');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('angular','a7');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('react','r1');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('react','r2');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('react','r3');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('react','r4');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('react','r5');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('react','r6');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('react','r7');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('vue','v1');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('vue','v2');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('vue','v3');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('vue','v4');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('vue','v5');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('vue','v6');
INSERT INTO public.lesson (tutorial_name,lesson_name) VALUES ('vue','v7');
