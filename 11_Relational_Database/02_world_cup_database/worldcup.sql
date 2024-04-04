--
-- PostgreSQL database dump
--

-- Dumped from database version 12.18 (Ubuntu 12.18-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.18 (Ubuntu 12.18-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE worldcup;
--
-- Name: worldcup; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE worldcup WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE worldcup OWNER TO freecodecamp;

\connect worldcup

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: games; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    year integer NOT NULL,
    round character varying(30) NOT NULL,
    winner_id integer NOT NULL,
    opponent_id integer NOT NULL,
    winner_goals integer NOT NULL,
    opponent_goals integer NOT NULL
);


ALTER TABLE public.games OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_game_id_seq OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- Name: teams; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.teams (
    team_id integer NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE public.teams OWNER TO freecodecamp;

--
-- Name: teams_team_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.teams_team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teams_team_id_seq OWNER TO freecodecamp;

--
-- Name: teams_team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.teams_team_id_seq OWNED BY public.teams.team_id;


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: teams team_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams ALTER COLUMN team_id SET DEFAULT nextval('public.teams_team_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.games VALUES (1, 2018, 'Final', 409, 410, 4, 2);
INSERT INTO public.games VALUES (2, 2018, 'Third Place', 411, 412, 2, 0);
INSERT INTO public.games VALUES (3, 2018, 'Semi-Final', 410, 412, 2, 1);
INSERT INTO public.games VALUES (4, 2018, 'Semi-Final', 409, 411, 1, 0);
INSERT INTO public.games VALUES (5, 2018, 'Quarter-Final', 410, 413, 3, 2);
INSERT INTO public.games VALUES (6, 2018, 'Quarter-Final', 412, 414, 2, 0);
INSERT INTO public.games VALUES (7, 2018, 'Quarter-Final', 411, 415, 2, 1);
INSERT INTO public.games VALUES (8, 2018, 'Quarter-Final', 409, 416, 2, 0);
INSERT INTO public.games VALUES (9, 2018, 'Eighth-Final', 412, 417, 2, 1);
INSERT INTO public.games VALUES (10, 2018, 'Eighth-Final', 414, 418, 1, 0);
INSERT INTO public.games VALUES (11, 2018, 'Eighth-Final', 411, 419, 3, 2);
INSERT INTO public.games VALUES (12, 2018, 'Eighth-Final', 415, 420, 2, 0);
INSERT INTO public.games VALUES (13, 2018, 'Eighth-Final', 410, 421, 2, 1);
INSERT INTO public.games VALUES (14, 2018, 'Eighth-Final', 413, 422, 2, 1);
INSERT INTO public.games VALUES (15, 2018, 'Eighth-Final', 416, 423, 2, 1);
INSERT INTO public.games VALUES (16, 2018, 'Eighth-Final', 409, 424, 4, 3);
INSERT INTO public.games VALUES (17, 2014, 'Final', 425, 424, 1, 0);
INSERT INTO public.games VALUES (18, 2014, 'Third Place', 426, 415, 3, 0);
INSERT INTO public.games VALUES (19, 2014, 'Semi-Final', 424, 426, 1, 0);
INSERT INTO public.games VALUES (20, 2014, 'Semi-Final', 425, 415, 7, 1);
INSERT INTO public.games VALUES (21, 2014, 'Quarter-Final', 426, 427, 1, 0);
INSERT INTO public.games VALUES (22, 2014, 'Quarter-Final', 424, 411, 1, 0);
INSERT INTO public.games VALUES (23, 2014, 'Quarter-Final', 415, 417, 2, 1);
INSERT INTO public.games VALUES (24, 2014, 'Quarter-Final', 425, 409, 1, 0);
INSERT INTO public.games VALUES (25, 2014, 'Eighth-Final', 415, 428, 2, 1);
INSERT INTO public.games VALUES (26, 2014, 'Eighth-Final', 417, 416, 2, 0);
INSERT INTO public.games VALUES (27, 2014, 'Eighth-Final', 409, 429, 2, 0);
INSERT INTO public.games VALUES (28, 2014, 'Eighth-Final', 425, 430, 2, 1);
INSERT INTO public.games VALUES (29, 2014, 'Eighth-Final', 426, 420, 2, 1);
INSERT INTO public.games VALUES (30, 2014, 'Eighth-Final', 427, 431, 2, 1);
INSERT INTO public.games VALUES (31, 2014, 'Eighth-Final', 424, 418, 1, 0);
INSERT INTO public.games VALUES (32, 2014, 'Eighth-Final', 411, 432, 2, 1);


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.teams VALUES (409, 'France');
INSERT INTO public.teams VALUES (410, 'Croatia');
INSERT INTO public.teams VALUES (411, 'Belgium');
INSERT INTO public.teams VALUES (412, 'England');
INSERT INTO public.teams VALUES (413, 'Russia');
INSERT INTO public.teams VALUES (414, 'Sweden');
INSERT INTO public.teams VALUES (415, 'Brazil');
INSERT INTO public.teams VALUES (416, 'Uruguay');
INSERT INTO public.teams VALUES (417, 'Colombia');
INSERT INTO public.teams VALUES (418, 'Switzerland');
INSERT INTO public.teams VALUES (419, 'Japan');
INSERT INTO public.teams VALUES (420, 'Mexico');
INSERT INTO public.teams VALUES (421, 'Denmark');
INSERT INTO public.teams VALUES (422, 'Spain');
INSERT INTO public.teams VALUES (423, 'Portugal');
INSERT INTO public.teams VALUES (424, 'Argentina');
INSERT INTO public.teams VALUES (425, 'Germany');
INSERT INTO public.teams VALUES (426, 'Netherlands');
INSERT INTO public.teams VALUES (427, 'Costa Rica');
INSERT INTO public.teams VALUES (428, 'Chile');
INSERT INTO public.teams VALUES (429, 'Nigeria');
INSERT INTO public.teams VALUES (430, 'Algeria');
INSERT INTO public.teams VALUES (431, 'Greece');
INSERT INTO public.teams VALUES (432, 'United States');


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.games_game_id_seq', 32, true);


--
-- Name: teams_team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.teams_team_id_seq', 432, true);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: teams teams_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_name_key UNIQUE (name);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (team_id);


--
-- Name: games games_opponent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_opponent_id_fkey FOREIGN KEY (opponent_id) REFERENCES public.teams(team_id);


--
-- Name: games games_winner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_winner_id_fkey FOREIGN KEY (winner_id) REFERENCES public.teams(team_id);


--
-- PostgreSQL database dump complete
--

