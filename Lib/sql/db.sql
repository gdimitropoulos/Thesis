

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

CREATE TABLE public.tutorial (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	tutorial_name text NOT null,
	CONSTRAINT tutorial_pk PRIMARY KEY (id),
	CONSTRAINT tutorialuk UNIQUE (tutorial_name)
);

CREATE TABLE public.tutorial_taken (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	tutorial_name text NOT NULL,
	user_id int8 NOT NULL,
	"time" varchar(100) NOT NULL,
	anwser_shown bool NOT NULL,
	backspaces int8 NOT NULL
	
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

ALTER TABLE ONLY public.tutorial
    ADD CONSTRAINT users_un_email UNIQUE (tutorial_name);

ALTER TABLE ONLY public.tutorial
    ADD CONSTRAINT users_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.tutorial_taken
    CONSTRAINT tutorial_taken_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.tutorial_taken
    ADD CONSTRAINT tutorial_takenfk1 FOREIGN KEY (tutorial_name) REFERENCES public.tutorial(tutorial_name);
    
ALTER TABLE ONLY public.tutorial_taken
    ADD CONSTRAINT tutorial_takenfk12 FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--