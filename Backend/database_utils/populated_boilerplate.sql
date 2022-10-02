--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Homebrew)
-- Dumped by pg_dump version 14.5 (Homebrew)

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

--
-- Name: hardware; Type: SCHEMA; Schema: -; Owner: adm
--

CREATE SCHEMA hardware;


ALTER SCHEMA hardware OWNER TO adm;

--
-- Name: protocols; Type: SCHEMA; Schema: -; Owner: adm
--

CREATE SCHEMA protocols;


ALTER SCHEMA protocols OWNER TO adm;

--
-- Name: users; Type: SCHEMA; Schema: -; Owner: adm
--

CREATE SCHEMA users;


ALTER SCHEMA users OWNER TO adm;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: device; Type: TABLE; Schema: hardware; Owner: adm
--

CREATE TABLE hardware.device (
    id integer NOT NULL,
    name character varying,
    svg character varying,
    version character varying,
    device_type_id integer
);


ALTER TABLE hardware.device OWNER TO adm;

--
-- Name: device_id_seq; Type: SEQUENCE; Schema: hardware; Owner: adm
--

CREATE SEQUENCE hardware.device_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hardware.device_id_seq OWNER TO adm;

--
-- Name: device_id_seq; Type: SEQUENCE OWNED BY; Schema: hardware; Owner: adm
--

ALTER SEQUENCE hardware.device_id_seq OWNED BY hardware.device.id;


--
-- Name: device_requirement; Type: TABLE; Schema: hardware; Owner: adm
--

CREATE TABLE hardware.device_requirement (
    id integer NOT NULL,
    parent_device_id integer,
    child_device_id integer,
    depth integer
);


ALTER TABLE hardware.device_requirement OWNER TO adm;

--
-- Name: device_requirement_id_seq; Type: SEQUENCE; Schema: hardware; Owner: adm
--

CREATE SEQUENCE hardware.device_requirement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hardware.device_requirement_id_seq OWNER TO adm;

--
-- Name: device_requirement_id_seq; Type: SEQUENCE OWNED BY; Schema: hardware; Owner: adm
--

ALTER SEQUENCE hardware.device_requirement_id_seq OWNED BY hardware.device_requirement.id;


--
-- Name: device_type; Type: TABLE; Schema: hardware; Owner: adm
--

CREATE TABLE hardware.device_type (
    id integer NOT NULL,
    name character varying
);


ALTER TABLE hardware.device_type OWNER TO adm;

--
-- Name: device_type_id_seq; Type: SEQUENCE; Schema: hardware; Owner: adm
--

CREATE SEQUENCE hardware.device_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hardware.device_type_id_seq OWNER TO adm;

--
-- Name: device_type_id_seq; Type: SEQUENCE OWNED BY; Schema: hardware; Owner: adm
--

ALTER SEQUENCE hardware.device_type_id_seq OWNED BY hardware.device_type.id;


--
-- Name: electrode; Type: TABLE; Schema: hardware; Owner: adm
--

CREATE TABLE hardware.electrode (
    id integer NOT NULL,
    device_id integer,
    svg_denomination character varying
);


ALTER TABLE hardware.electrode OWNER TO adm;

--
-- Name: electrode_feature; Type: TABLE; Schema: hardware; Owner: adm
--

CREATE TABLE hardware.electrode_feature (
    id integer NOT NULL,
    feature_type_id integer,
    electrode_cartridge_id integer,
    require_device_id integer
);


ALTER TABLE hardware.electrode_feature OWNER TO adm;

--
-- Name: electrode_feature_id_seq; Type: SEQUENCE; Schema: hardware; Owner: adm
--

CREATE SEQUENCE hardware.electrode_feature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hardware.electrode_feature_id_seq OWNER TO adm;

--
-- Name: electrode_feature_id_seq; Type: SEQUENCE OWNED BY; Schema: hardware; Owner: adm
--

ALTER SEQUENCE hardware.electrode_feature_id_seq OWNED BY hardware.electrode_feature.id;


--
-- Name: electrode_feedback; Type: TABLE; Schema: hardware; Owner: adm
--

CREATE TABLE hardware.electrode_feedback (
    id integer NOT NULL,
    feedback_type_id integer,
    electrode_cartridge_id integer,
    require_device_id integer
);


ALTER TABLE hardware.electrode_feedback OWNER TO adm;

--
-- Name: electrode_feedback_id_seq; Type: SEQUENCE; Schema: hardware; Owner: adm
--

CREATE SEQUENCE hardware.electrode_feedback_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hardware.electrode_feedback_id_seq OWNER TO adm;

--
-- Name: electrode_feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: hardware; Owner: adm
--

ALTER SEQUENCE hardware.electrode_feedback_id_seq OWNED BY hardware.electrode_feedback.id;


--
-- Name: electrode_id_seq; Type: SEQUENCE; Schema: hardware; Owner: adm
--

CREATE SEQUENCE hardware.electrode_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hardware.electrode_id_seq OWNER TO adm;

--
-- Name: electrode_id_seq; Type: SEQUENCE OWNED BY; Schema: hardware; Owner: adm
--

ALTER SEQUENCE hardware.electrode_id_seq OWNED BY hardware.electrode.id;


--
-- Name: feature_type; Type: TABLE; Schema: hardware; Owner: adm
--

CREATE TABLE hardware.feature_type (
    id integer NOT NULL,
    name character varying,
    data_type character varying
);


ALTER TABLE hardware.feature_type OWNER TO adm;

--
-- Name: feature_type_id_seq; Type: SEQUENCE; Schema: hardware; Owner: adm
--

CREATE SEQUENCE hardware.feature_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hardware.feature_type_id_seq OWNER TO adm;

--
-- Name: feature_type_id_seq; Type: SEQUENCE OWNED BY; Schema: hardware; Owner: adm
--

ALTER SEQUENCE hardware.feature_type_id_seq OWNED BY hardware.feature_type.id;


--
-- Name: feedback_type; Type: TABLE; Schema: hardware; Owner: adm
--

CREATE TABLE hardware.feedback_type (
    id integer NOT NULL,
    name character varying,
    data_type character varying
);


ALTER TABLE hardware.feedback_type OWNER TO adm;

--
-- Name: feedback_type_id_seq; Type: SEQUENCE; Schema: hardware; Owner: adm
--

CREATE SEQUENCE hardware.feedback_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hardware.feedback_type_id_seq OWNER TO adm;

--
-- Name: feedback_type_id_seq; Type: SEQUENCE OWNED BY; Schema: hardware; Owner: adm
--

ALTER SEQUENCE hardware.feedback_type_id_seq OWNED BY hardware.feedback_type.id;


--
-- Name: liquid; Type: TABLE; Schema: hardware; Owner: adm
--

CREATE TABLE hardware.liquid (
    id integer NOT NULL,
    name character varying,
    description character varying
);


ALTER TABLE hardware.liquid OWNER TO adm;

--
-- Name: liquid_authors; Type: TABLE; Schema: hardware; Owner: adm
--

CREATE TABLE hardware.liquid_authors (
    id integer NOT NULL,
    liquid_id integer,
    user_id integer,
    rank integer
);


ALTER TABLE hardware.liquid_authors OWNER TO adm;

--
-- Name: liquid_authors_id_seq; Type: SEQUENCE; Schema: hardware; Owner: adm
--

CREATE SEQUENCE hardware.liquid_authors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hardware.liquid_authors_id_seq OWNER TO adm;

--
-- Name: liquid_authors_id_seq; Type: SEQUENCE OWNED BY; Schema: hardware; Owner: adm
--

ALTER SEQUENCE hardware.liquid_authors_id_seq OWNED BY hardware.liquid_authors.id;


--
-- Name: liquid_id_seq; Type: SEQUENCE; Schema: hardware; Owner: adm
--

CREATE SEQUENCE hardware.liquid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hardware.liquid_id_seq OWNER TO adm;

--
-- Name: liquid_id_seq; Type: SEQUENCE OWNED BY; Schema: hardware; Owner: adm
--

ALTER SEQUENCE hardware.liquid_id_seq OWNED BY hardware.liquid.id;


--
-- Name: authors; Type: TABLE; Schema: protocols; Owner: adm
--

CREATE TABLE protocols.authors (
    id integer NOT NULL,
    protocol_id integer,
    user_id integer,
    rank integer
);


ALTER TABLE protocols.authors OWNER TO adm;

--
-- Name: authors_id_seq; Type: SEQUENCE; Schema: protocols; Owner: adm
--

CREATE SEQUENCE protocols.authors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE protocols.authors_id_seq OWNER TO adm;

--
-- Name: authors_id_seq; Type: SEQUENCE OWNED BY; Schema: protocols; Owner: adm
--

ALTER SEQUENCE protocols.authors_id_seq OWNED BY protocols.authors.id;


--
-- Name: frame; Type: TABLE; Schema: protocols; Owner: adm
--

CREATE TABLE protocols.frame (
    id integer NOT NULL,
    protocol_id integer,
    duration integer,
    rank integer
);


ALTER TABLE protocols.frame OWNER TO adm;

--
-- Name: frame_electrode; Type: TABLE; Schema: protocols; Owner: adm
--

CREATE TABLE protocols.frame_electrode (
    id integer NOT NULL,
    frame_id integer,
    value integer,
    electrode_id integer
);


ALTER TABLE protocols.frame_electrode OWNER TO adm;

--
-- Name: frame_electrode_id_seq; Type: SEQUENCE; Schema: protocols; Owner: adm
--

CREATE SEQUENCE protocols.frame_electrode_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE protocols.frame_electrode_id_seq OWNER TO adm;

--
-- Name: frame_electrode_id_seq; Type: SEQUENCE OWNED BY; Schema: protocols; Owner: adm
--

ALTER SEQUENCE protocols.frame_electrode_id_seq OWNED BY protocols.frame_electrode.id;


--
-- Name: frame_feature; Type: TABLE; Schema: protocols; Owner: adm
--

CREATE TABLE protocols.frame_feature (
    id integer NOT NULL,
    frame_id integer,
    electrode_id integer,
    hardware_feature_id integer,
    value integer
);


ALTER TABLE protocols.frame_feature OWNER TO adm;

--
-- Name: frame_feature_id_seq; Type: SEQUENCE; Schema: protocols; Owner: adm
--

CREATE SEQUENCE protocols.frame_feature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE protocols.frame_feature_id_seq OWNER TO adm;

--
-- Name: frame_feature_id_seq; Type: SEQUENCE OWNED BY; Schema: protocols; Owner: adm
--

ALTER SEQUENCE protocols.frame_feature_id_seq OWNED BY protocols.frame_feature.id;


--
-- Name: frame_feedback; Type: TABLE; Schema: protocols; Owner: adm
--

CREATE TABLE protocols.frame_feedback (
    id integer NOT NULL,
    frame_id integer,
    electrode_id integer,
    hardware_feeback_id integer,
    value integer
);


ALTER TABLE protocols.frame_feedback OWNER TO adm;

--
-- Name: frame_feedback_id_seq; Type: SEQUENCE; Schema: protocols; Owner: adm
--

CREATE SEQUENCE protocols.frame_feedback_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE protocols.frame_feedback_id_seq OWNER TO adm;

--
-- Name: frame_feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: protocols; Owner: adm
--

ALTER SEQUENCE protocols.frame_feedback_id_seq OWNED BY protocols.frame_feedback.id;


--
-- Name: frame_id_seq; Type: SEQUENCE; Schema: protocols; Owner: adm
--

CREATE SEQUENCE protocols.frame_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE protocols.frame_id_seq OWNER TO adm;

--
-- Name: frame_id_seq; Type: SEQUENCE OWNED BY; Schema: protocols; Owner: adm
--

ALTER SEQUENCE protocols.frame_id_seq OWNED BY protocols.frame.id;


--
-- Name: nested_protocols; Type: TABLE; Schema: protocols; Owner: adm
--

CREATE TABLE protocols.nested_protocols (
    id integer NOT NULL,
    parent_protocol_id integer,
    child_protocol_id integer,
    depth integer
);


ALTER TABLE protocols.nested_protocols OWNER TO adm;

--
-- Name: nested_protocols_id_seq; Type: SEQUENCE; Schema: protocols; Owner: adm
--

CREATE SEQUENCE protocols.nested_protocols_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE protocols.nested_protocols_id_seq OWNER TO adm;

--
-- Name: nested_protocols_id_seq; Type: SEQUENCE OWNED BY; Schema: protocols; Owner: adm
--

ALTER SEQUENCE protocols.nested_protocols_id_seq OWNED BY protocols.nested_protocols.id;


--
-- Name: poi_types; Type: TABLE; Schema: protocols; Owner: adm
--

CREATE TABLE protocols.poi_types (
    id integer NOT NULL,
    name character varying
);


ALTER TABLE protocols.poi_types OWNER TO adm;

--
-- Name: poi_types_id_seq; Type: SEQUENCE; Schema: protocols; Owner: adm
--

CREATE SEQUENCE protocols.poi_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE protocols.poi_types_id_seq OWNER TO adm;

--
-- Name: poi_types_id_seq; Type: SEQUENCE OWNED BY; Schema: protocols; Owner: adm
--

ALTER SEQUENCE protocols.poi_types_id_seq OWNED BY protocols.poi_types.id;


--
-- Name: point_of_interest; Type: TABLE; Schema: protocols; Owner: adm
--

CREATE TABLE protocols.point_of_interest (
    id integer NOT NULL,
    frame_id integer,
    electrode_id integer,
    type_id integer,
    liquid_id integer
);


ALTER TABLE protocols.point_of_interest OWNER TO adm;

--
-- Name: point_of_interest_id_seq; Type: SEQUENCE; Schema: protocols; Owner: adm
--

CREATE SEQUENCE protocols.point_of_interest_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE protocols.point_of_interest_id_seq OWNER TO adm;

--
-- Name: point_of_interest_id_seq; Type: SEQUENCE OWNED BY; Schema: protocols; Owner: adm
--

ALTER SEQUENCE protocols.point_of_interest_id_seq OWNED BY protocols.point_of_interest.id;


--
-- Name: protocol; Type: TABLE; Schema: protocols; Owner: adm
--

CREATE TABLE protocols.protocol (
    id integer NOT NULL,
    name character varying,
    frame_count integer,
    total_duration integer,
    mask_frame_id integer,
    date_created timestamp,
    version character varying,
    fork_of integer,
    device_id integer
);


ALTER TABLE protocols.protocol OWNER TO adm;

--
-- Name: protocol_id_seq; Type: SEQUENCE; Schema: protocols; Owner: adm
--

CREATE SEQUENCE protocols.protocol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE protocols.protocol_id_seq OWNER TO adm;

--
-- Name: protocol_id_seq; Type: SEQUENCE OWNED BY; Schema: protocols; Owner: adm
--

ALTER SEQUENCE protocols.protocol_id_seq OWNED BY protocols.protocol.id;


--
-- Name: device; Type: TABLE; Schema: users; Owner: adm
--

CREATE TABLE users.device (
    id integer NOT NULL,
    hardware_uid character varying,
    name character varying,
    user_id integer,
    device_id integer
);


ALTER TABLE users.device OWNER TO adm;

--
-- Name: device_id_seq; Type: SEQUENCE; Schema: users; Owner: adm
--

CREATE SEQUENCE users.device_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users.device_id_seq OWNER TO adm;

--
-- Name: device_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: adm
--

ALTER SEQUENCE users.device_id_seq OWNED BY users.device.id;


--
-- Name: token; Type: TABLE; Schema: users; Owner: adm
--

CREATE TABLE users.token (
    id integer NOT NULL,
    user_id integer,
    token character varying,
    expiration_date timestamp
);


ALTER TABLE users.token OWNER TO adm;

--
-- Name: token_id_seq; Type: SEQUENCE; Schema: users; Owner: adm
--

CREATE SEQUENCE users.token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users.token_id_seq OWNER TO adm;

--
-- Name: token_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: adm
--

ALTER SEQUENCE users.token_id_seq OWNED BY users.token.id;


--
-- Name: user; Type: TABLE; Schema: users; Owner: adm
--

CREATE TABLE users."user" (
    id integer NOT NULL,
    login character varying,
    password character varying
);


ALTER TABLE users."user" OWNER TO adm;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: users; Owner: adm
--

CREATE SEQUENCE users.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users.user_id_seq OWNER TO adm;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: adm
--

ALTER SEQUENCE users.user_id_seq OWNED BY users."user".id;


--
-- Name: device id; Type: DEFAULT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.device ALTER COLUMN id SET DEFAULT nextval('hardware.device_id_seq'::regclass);


--
-- Name: device_requirement id; Type: DEFAULT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.device_requirement ALTER COLUMN id SET DEFAULT nextval('hardware.device_requirement_id_seq'::regclass);


--
-- Name: device_type id; Type: DEFAULT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.device_type ALTER COLUMN id SET DEFAULT nextval('hardware.device_type_id_seq'::regclass);


--
-- Name: electrode id; Type: DEFAULT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.electrode ALTER COLUMN id SET DEFAULT nextval('hardware.electrode_id_seq'::regclass);


--
-- Name: electrode_feature id; Type: DEFAULT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.electrode_feature ALTER COLUMN id SET DEFAULT nextval('hardware.electrode_feature_id_seq'::regclass);


--
-- Name: electrode_feedback id; Type: DEFAULT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.electrode_feedback ALTER COLUMN id SET DEFAULT nextval('hardware.electrode_feedback_id_seq'::regclass);


--
-- Name: feature_type id; Type: DEFAULT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.feature_type ALTER COLUMN id SET DEFAULT nextval('hardware.feature_type_id_seq'::regclass);


--
-- Name: feedback_type id; Type: DEFAULT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.feedback_type ALTER COLUMN id SET DEFAULT nextval('hardware.feedback_type_id_seq'::regclass);


--
-- Name: liquid id; Type: DEFAULT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.liquid ALTER COLUMN id SET DEFAULT nextval('hardware.liquid_id_seq'::regclass);


--
-- Name: liquid_authors id; Type: DEFAULT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.liquid_authors ALTER COLUMN id SET DEFAULT nextval('hardware.liquid_authors_id_seq'::regclass);


--
-- Name: authors id; Type: DEFAULT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.authors ALTER COLUMN id SET DEFAULT nextval('protocols.authors_id_seq'::regclass);


--
-- Name: frame id; Type: DEFAULT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame ALTER COLUMN id SET DEFAULT nextval('protocols.frame_id_seq'::regclass);


--
-- Name: frame_electrode id; Type: DEFAULT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame_electrode ALTER COLUMN id SET DEFAULT nextval('protocols.frame_electrode_id_seq'::regclass);


--
-- Name: frame_feature id; Type: DEFAULT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame_feature ALTER COLUMN id SET DEFAULT nextval('protocols.frame_feature_id_seq'::regclass);


--
-- Name: frame_feedback id; Type: DEFAULT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame_feedback ALTER COLUMN id SET DEFAULT nextval('protocols.frame_feedback_id_seq'::regclass);


--
-- Name: nested_protocols id; Type: DEFAULT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.nested_protocols ALTER COLUMN id SET DEFAULT nextval('protocols.nested_protocols_id_seq'::regclass);


--
-- Name: poi_types id; Type: DEFAULT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.poi_types ALTER COLUMN id SET DEFAULT nextval('protocols.poi_types_id_seq'::regclass);


--
-- Name: point_of_interest id; Type: DEFAULT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.point_of_interest ALTER COLUMN id SET DEFAULT nextval('protocols.point_of_interest_id_seq'::regclass);


--
-- Name: protocol id; Type: DEFAULT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.protocol ALTER COLUMN id SET DEFAULT nextval('protocols.protocol_id_seq'::regclass);


--
-- Name: device id; Type: DEFAULT; Schema: users; Owner: adm
--

ALTER TABLE ONLY users.device ALTER COLUMN id SET DEFAULT nextval('users.device_id_seq'::regclass);


--
-- Name: token id; Type: DEFAULT; Schema: users; Owner: adm
--

ALTER TABLE ONLY users.token ALTER COLUMN id SET DEFAULT nextval('users.token_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: users; Owner: adm
--

ALTER TABLE ONLY users."user" ALTER COLUMN id SET DEFAULT nextval('users.user_id_seq'::regclass);


--
-- Data for Name: device; Type: TABLE DATA; Schema: hardware; Owner: adm
--

COPY hardware.device (id, name, svg, version, device_type_id) FROM stdin;
1	Cartridge	<svg/>	1	1
\.


--
-- Data for Name: device_requirement; Type: TABLE DATA; Schema: hardware; Owner: adm
--

COPY hardware.device_requirement (id, parent_device_id, child_device_id) FROM stdin;
\.


--
-- Data for Name: device_type; Type: TABLE DATA; Schema: hardware; Owner: adm
--

COPY hardware.device_type (id, name) FROM stdin;
1	OpenDrop
\.


--
-- Data for Name: electrode; Type: TABLE DATA; Schema: hardware; Owner: adm
--

COPY hardware.electrode (id, device_id, svg_denomination) FROM stdin;
1	1	e1
2	1	e1
3	1	e2
4	1	e3
5	1	e4
6	1	e5
7	1	e6
8	1	e7
9	1	e8
10	1	e9
11	1	e10
12	1	e11
13	1	e12
14	1	e13
15	1	e14
16	1	e15
17	1	e16
18	1	e17
19	1	e18
20	1	e19
21	1	e20
22	1	e21
23	1	e22
24	1	e23
\.


--
-- Data for Name: electrode_feature; Type: TABLE DATA; Schema: hardware; Owner: adm
--

COPY hardware.electrode_feature (id, feature_type_id, electrode_cartridge_id, require_device_id) FROM stdin;
\.


--
-- Data for Name: electrode_feedback; Type: TABLE DATA; Schema: hardware; Owner: adm
--

COPY hardware.electrode_feedback (id, feedback_type_id, electrode_cartridge_id, require_device_id) FROM stdin;
\.


--
-- Data for Name: feature_type; Type: TABLE DATA; Schema: hardware; Owner: adm
--

COPY hardware.feature_type (id, name, data_type) FROM stdin;
\.


--
-- Data for Name: feedback_type; Type: TABLE DATA; Schema: hardware; Owner: adm
--

COPY hardware.feedback_type (id, name, data_type) FROM stdin;
\.


--
-- Data for Name: liquid; Type: TABLE DATA; Schema: hardware; Owner: adm
--

COPY hardware.liquid (id, name, description) FROM stdin;
\.


--
-- Data for Name: liquid_authors; Type: TABLE DATA; Schema: hardware; Owner: adm
--

COPY hardware.liquid_authors (id, liquid_id, user_id, rank) FROM stdin;
\.


--
-- Data for Name: authors; Type: TABLE DATA; Schema: protocols; Owner: adm
--

COPY protocols.authors (id, protocol_id, user_id, rank) FROM stdin;
2	1	1	1
3	2	1	1
4	2	2	2
\.


--
-- Data for Name: frame; Type: TABLE DATA; Schema: protocols; Owner: adm
--

COPY protocols.frame (id, protocol_id, duration, rank) FROM stdin;
1	1	50	1
2	1	20	2
3	1	30	3
4	1	20	4
5	1	20	5
6	1	20	6
7	1	25	7
8	1	50	8
9	2	33	1
10	2	32	2
11	2	31	3
12	2	30	4
13	2	29	5
\.


--
-- Data for Name: frame_electrode; Type: TABLE DATA; Schema: protocols; Owner: adm
--

COPY protocols.frame_electrode (id, frame_id, value, electrode_id) FROM stdin;
1	1	10	1
2	3	10	2
3	3	10	3
4	4	10	4
5	4	10	5
6	4	10	6
7	5	10	7
8	5	10	8
9	9	8	10
10	10	8	11
\.


--
-- Data for Name: frame_feature; Type: TABLE DATA; Schema: protocols; Owner: adm
--

COPY protocols.frame_feature (id, frame_id, electrode_id, hardware_feature_id, value) FROM stdin;
\.


--
-- Data for Name: frame_feedback; Type: TABLE DATA; Schema: protocols; Owner: adm
--

COPY protocols.frame_feedback (id, frame_id, electrode_id, hardware_feeback_id, value) FROM stdin;
\.


--
-- Data for Name: nested_protocols; Type: TABLE DATA; Schema: protocols; Owner: adm
--

COPY protocols.nested_protocols (id, parent_protocol_id, child_protocol_id) FROM stdin;
\.


--
-- Data for Name: poi_types; Type: TABLE DATA; Schema: protocols; Owner: adm
--

COPY protocols.poi_types (id, name) FROM stdin;
\.


--
-- Data for Name: point_of_interest; Type: TABLE DATA; Schema: protocols; Owner: adm
--

COPY protocols.point_of_interest (id, frame_id, electrode_id, type_id, liquid_id) FROM stdin;
\.


--
-- Data for Name: protocol; Type: TABLE DATA; Schema: protocols; Owner: adm
--

COPY protocols.protocol (id, name, frame_count, total_duration, mask_frame_id, date_created, version, fork_of, device_id) FROM stdin;
1	Test protocol	32	453	\N	2022-09-30	1	\N	1
2	Test protocol 2	46	1090	\N	2022-09-30	2	\N	1
\.


--
-- Data for Name: device; Type: TABLE DATA; Schema: users; Owner: adm
--

COPY users.device (id, hardware_uid, name, user_id, device_id) FROM stdin;
\.


--
-- Data for Name: token; Type: TABLE DATA; Schema: users; Owner: adm
--

COPY users.token (id, user_id, token, expiration_date) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: users; Owner: adm
--

COPY users."user" (id, login, password) FROM stdin;
1	testuser	testpassword
2	testuser2	testpassword
\.


--
-- Name: device_id_seq; Type: SEQUENCE SET; Schema: hardware; Owner: adm
--

SELECT pg_catalog.setval('hardware.device_id_seq', 1, true);


--
-- Name: device_requirement_id_seq; Type: SEQUENCE SET; Schema: hardware; Owner: adm
--

SELECT pg_catalog.setval('hardware.device_requirement_id_seq', 1, false);


--
-- Name: device_type_id_seq; Type: SEQUENCE SET; Schema: hardware; Owner: adm
--

SELECT pg_catalog.setval('hardware.device_type_id_seq', 1, false);


--
-- Name: electrode_feature_id_seq; Type: SEQUENCE SET; Schema: hardware; Owner: adm
--

SELECT pg_catalog.setval('hardware.electrode_feature_id_seq', 1, false);


--
-- Name: electrode_feedback_id_seq; Type: SEQUENCE SET; Schema: hardware; Owner: adm
--

SELECT pg_catalog.setval('hardware.electrode_feedback_id_seq', 1, false);


--
-- Name: electrode_id_seq; Type: SEQUENCE SET; Schema: hardware; Owner: adm
--

SELECT pg_catalog.setval('hardware.electrode_id_seq', 24, true);


--
-- Name: feature_type_id_seq; Type: SEQUENCE SET; Schema: hardware; Owner: adm
--

SELECT pg_catalog.setval('hardware.feature_type_id_seq', 1, false);


--
-- Name: feedback_type_id_seq; Type: SEQUENCE SET; Schema: hardware; Owner: adm
--

SELECT pg_catalog.setval('hardware.feedback_type_id_seq', 1, false);


--
-- Name: liquid_authors_id_seq; Type: SEQUENCE SET; Schema: hardware; Owner: adm
--

SELECT pg_catalog.setval('hardware.liquid_authors_id_seq', 1, false);


--
-- Name: liquid_id_seq; Type: SEQUENCE SET; Schema: hardware; Owner: adm
--

SELECT pg_catalog.setval('hardware.liquid_id_seq', 1, false);


--
-- Name: authors_id_seq; Type: SEQUENCE SET; Schema: protocols; Owner: adm
--

SELECT pg_catalog.setval('protocols.authors_id_seq', 4, true);


--
-- Name: frame_electrode_id_seq; Type: SEQUENCE SET; Schema: protocols; Owner: adm
--

SELECT pg_catalog.setval('protocols.frame_electrode_id_seq', 10, true);


--
-- Name: frame_feature_id_seq; Type: SEQUENCE SET; Schema: protocols; Owner: adm
--

SELECT pg_catalog.setval('protocols.frame_feature_id_seq', 1, false);


--
-- Name: frame_feedback_id_seq; Type: SEQUENCE SET; Schema: protocols; Owner: adm
--

SELECT pg_catalog.setval('protocols.frame_feedback_id_seq', 1, false);


--
-- Name: frame_id_seq; Type: SEQUENCE SET; Schema: protocols; Owner: adm
--

SELECT pg_catalog.setval('protocols.frame_id_seq', 13, true);


--
-- Name: nested_protocols_id_seq; Type: SEQUENCE SET; Schema: protocols; Owner: adm
--

SELECT pg_catalog.setval('protocols.nested_protocols_id_seq', 1, false);


--
-- Name: poi_types_id_seq; Type: SEQUENCE SET; Schema: protocols; Owner: adm
--

SELECT pg_catalog.setval('protocols.poi_types_id_seq', 1, false);


--
-- Name: point_of_interest_id_seq; Type: SEQUENCE SET; Schema: protocols; Owner: adm
--

SELECT pg_catalog.setval('protocols.point_of_interest_id_seq', 1, false);


--
-- Name: protocol_id_seq; Type: SEQUENCE SET; Schema: protocols; Owner: adm
--

SELECT pg_catalog.setval('protocols.protocol_id_seq', 2, true);


--
-- Name: device_id_seq; Type: SEQUENCE SET; Schema: users; Owner: adm
--

SELECT pg_catalog.setval('users.device_id_seq', 1, false);


--
-- Name: token_id_seq; Type: SEQUENCE SET; Schema: users; Owner: adm
--

SELECT pg_catalog.setval('users.token_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: users; Owner: adm
--

SELECT pg_catalog.setval('users.user_id_seq', 2, true);


--
-- Name: device device_pkey; Type: CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.device
    ADD CONSTRAINT device_pkey PRIMARY KEY (id);


--
-- Name: device_requirement device_requirement_pkey; Type: CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.device_requirement
    ADD CONSTRAINT device_requirement_pkey PRIMARY KEY (id);


--
-- Name: device_type device_type_pkey; Type: CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.device_type
    ADD CONSTRAINT device_type_pkey PRIMARY KEY (id);


--
-- Name: electrode_feature electrode_feature_pkey; Type: CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.electrode_feature
    ADD CONSTRAINT electrode_feature_pkey PRIMARY KEY (id);


--
-- Name: electrode_feedback electrode_feedback_pkey; Type: CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.electrode_feedback
    ADD CONSTRAINT electrode_feedback_pkey PRIMARY KEY (id);


--
-- Name: electrode electrode_pkey; Type: CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.electrode
    ADD CONSTRAINT electrode_pkey PRIMARY KEY (id);


--
-- Name: feature_type feature_type_pkey; Type: CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.feature_type
    ADD CONSTRAINT feature_type_pkey PRIMARY KEY (id);


--
-- Name: feedback_type feedback_type_pkey; Type: CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.feedback_type
    ADD CONSTRAINT feedback_type_pkey PRIMARY KEY (id);


--
-- Name: liquid_authors liquid_authors_pkey; Type: CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.liquid_authors
    ADD CONSTRAINT liquid_authors_pkey PRIMARY KEY (id);


--
-- Name: liquid liquid_pkey; Type: CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.liquid
    ADD CONSTRAINT liquid_pkey PRIMARY KEY (id);


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- Name: frame_electrode frame_electrode_pkey; Type: CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame_electrode
    ADD CONSTRAINT frame_electrode_pkey PRIMARY KEY (id);


--
-- Name: frame_feature frame_feature_pkey; Type: CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame_feature
    ADD CONSTRAINT frame_feature_pkey PRIMARY KEY (id);


--
-- Name: frame_feedback frame_feedback_pkey; Type: CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame_feedback
    ADD CONSTRAINT frame_feedback_pkey PRIMARY KEY (id);


--
-- Name: frame frame_pkey; Type: CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame
    ADD CONSTRAINT frame_pkey PRIMARY KEY (id);


--
-- Name: nested_protocols nested_protocols_pkey; Type: CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.nested_protocols
    ADD CONSTRAINT nested_protocols_pkey PRIMARY KEY (id);


--
-- Name: poi_types poi_types_pkey; Type: CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.poi_types
    ADD CONSTRAINT poi_types_pkey PRIMARY KEY (id);


--
-- Name: point_of_interest point_of_interest_pkey; Type: CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.point_of_interest
    ADD CONSTRAINT point_of_interest_pkey PRIMARY KEY (id);


--
-- Name: protocol protocol_pkey; Type: CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.protocol
    ADD CONSTRAINT protocol_pkey PRIMARY KEY (id);


--
-- Name: device device_pkey; Type: CONSTRAINT; Schema: users; Owner: adm
--

ALTER TABLE ONLY users.device
    ADD CONSTRAINT device_pkey PRIMARY KEY (id);


--
-- Name: token token_pkey; Type: CONSTRAINT; Schema: users; Owner: adm
--

ALTER TABLE ONLY users.token
    ADD CONSTRAINT token_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: users; Owner: adm
--

ALTER TABLE ONLY users."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: device device_device_type_id_fkey; Type: FK CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.device
    ADD CONSTRAINT device_device_type_id_fkey FOREIGN KEY (device_type_id) REFERENCES hardware.device_type(id);


--
-- Name: device_requirement device_requirement_child_device_id_fkey; Type: FK CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.device_requirement
    ADD CONSTRAINT device_requirement_child_device_id_fkey FOREIGN KEY (child_device_id) REFERENCES hardware.device(id);


--
-- Name: device_requirement device_requirement_parent_device_id_fkey; Type: FK CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.device_requirement
    ADD CONSTRAINT device_requirement_parent_device_id_fkey FOREIGN KEY (parent_device_id) REFERENCES hardware.device(id);


--
-- Name: electrode electrode_device_id_fkey; Type: FK CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.electrode
    ADD CONSTRAINT electrode_device_id_fkey FOREIGN KEY (device_id) REFERENCES hardware.device(id);


--
-- Name: electrode_feature electrode_feature_electrode_cartridge_id_fkey; Type: FK CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.electrode_feature
    ADD CONSTRAINT electrode_feature_electrode_cartridge_id_fkey FOREIGN KEY (electrode_cartridge_id) REFERENCES hardware.electrode(id);


--
-- Name: electrode_feature electrode_feature_feature_type_id_fkey; Type: FK CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.electrode_feature
    ADD CONSTRAINT electrode_feature_feature_type_id_fkey FOREIGN KEY (feature_type_id) REFERENCES hardware.feature_type(id);


--
-- Name: electrode_feature electrode_feature_require_device_id_fkey; Type: FK CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.electrode_feature
    ADD CONSTRAINT electrode_feature_require_device_id_fkey FOREIGN KEY (require_device_id) REFERENCES hardware.device(id);


--
-- Name: electrode_feedback electrode_feedback_electrode_cartridge_id_fkey; Type: FK CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.electrode_feedback
    ADD CONSTRAINT electrode_feedback_electrode_cartridge_id_fkey FOREIGN KEY (electrode_cartridge_id) REFERENCES hardware.electrode(id);


--
-- Name: electrode_feedback electrode_feedback_feedback_type_id_fkey; Type: FK CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.electrode_feedback
    ADD CONSTRAINT electrode_feedback_feedback_type_id_fkey FOREIGN KEY (feedback_type_id) REFERENCES hardware.feedback_type(id);


--
-- Name: electrode_feedback electrode_feedback_require_device_id_fkey; Type: FK CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.electrode_feedback
    ADD CONSTRAINT electrode_feedback_require_device_id_fkey FOREIGN KEY (require_device_id) REFERENCES hardware.device(id);


--
-- Name: liquid_authors liquid_authors_liquid_id_fkey; Type: FK CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.liquid_authors
    ADD CONSTRAINT liquid_authors_liquid_id_fkey FOREIGN KEY (liquid_id) REFERENCES hardware.liquid(id);


--
-- Name: liquid_authors liquid_authors_user_id_fkey; Type: FK CONSTRAINT; Schema: hardware; Owner: adm
--

ALTER TABLE ONLY hardware.liquid_authors
    ADD CONSTRAINT liquid_authors_user_id_fkey FOREIGN KEY (user_id) REFERENCES users."user"(id);


--
-- Name: authors authors_protocol_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.authors
    ADD CONSTRAINT authors_protocol_id_fkey FOREIGN KEY (protocol_id) REFERENCES protocols.protocol(id);


--
-- Name: authors authors_user_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.authors
    ADD CONSTRAINT authors_user_id_fkey FOREIGN KEY (user_id) REFERENCES users."user"(id);


--
-- Name: frame_electrode frame_electrode_electrode_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame_electrode
    ADD CONSTRAINT frame_electrode_electrode_id_fkey FOREIGN KEY (electrode_id) REFERENCES hardware.electrode(id);


--
-- Name: frame_electrode frame_electrode_frame_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame_electrode
    ADD CONSTRAINT frame_electrode_frame_id_fkey FOREIGN KEY (frame_id) REFERENCES protocols.frame(id);


--
-- Name: frame_feature frame_feature_electrode_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame_feature
    ADD CONSTRAINT frame_feature_electrode_id_fkey FOREIGN KEY (electrode_id) REFERENCES hardware.electrode(id);


--
-- Name: frame_feature frame_feature_frame_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame_feature
    ADD CONSTRAINT frame_feature_frame_id_fkey FOREIGN KEY (frame_id) REFERENCES protocols.frame(id);


--
-- Name: frame_feature frame_feature_hardware_feature_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame_feature
    ADD CONSTRAINT frame_feature_hardware_feature_id_fkey FOREIGN KEY (hardware_feature_id) REFERENCES hardware.electrode_feature(id);


--
-- Name: frame_feedback frame_feedback_electrode_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame_feedback
    ADD CONSTRAINT frame_feedback_electrode_id_fkey FOREIGN KEY (electrode_id) REFERENCES hardware.electrode(id);


--
-- Name: frame_feedback frame_feedback_frame_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame_feedback
    ADD CONSTRAINT frame_feedback_frame_id_fkey FOREIGN KEY (frame_id) REFERENCES protocols.frame(id);


--
-- Name: frame_feedback frame_feedback_hardware_feeback_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame_feedback
    ADD CONSTRAINT frame_feedback_hardware_feeback_id_fkey FOREIGN KEY (hardware_feeback_id) REFERENCES hardware.electrode_feedback(id);


--
-- Name: frame frame_protocol_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.frame
    ADD CONSTRAINT frame_protocol_id_fkey FOREIGN KEY (protocol_id) REFERENCES protocols.protocol(id);


--
-- Name: nested_protocols nested_protocols_child_protocol_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.nested_protocols
    ADD CONSTRAINT nested_protocols_child_protocol_id_fkey FOREIGN KEY (child_protocol_id) REFERENCES protocols.protocol(id);


--
-- Name: nested_protocols nested_protocols_parent_protocol_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.nested_protocols
    ADD CONSTRAINT nested_protocols_parent_protocol_id_fkey FOREIGN KEY (parent_protocol_id) REFERENCES protocols.protocol(id);


--
-- Name: point_of_interest point_of_interest_electrode_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.point_of_interest
    ADD CONSTRAINT point_of_interest_electrode_id_fkey FOREIGN KEY (electrode_id) REFERENCES hardware.electrode(id);


--
-- Name: point_of_interest point_of_interest_frame_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.point_of_interest
    ADD CONSTRAINT point_of_interest_frame_id_fkey FOREIGN KEY (frame_id) REFERENCES protocols.frame(id);


--
-- Name: point_of_interest point_of_interest_liquid_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.point_of_interest
    ADD CONSTRAINT point_of_interest_liquid_id_fkey FOREIGN KEY (liquid_id) REFERENCES hardware.liquid(id);


--
-- Name: point_of_interest point_of_interest_type_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.point_of_interest
    ADD CONSTRAINT point_of_interest_type_id_fkey FOREIGN KEY (type_id) REFERENCES protocols.poi_types(id);


--
-- Name: protocol protocol_device_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.protocol
    ADD CONSTRAINT protocol_device_id_fkey FOREIGN KEY (device_id) REFERENCES hardware.device(id);


--
-- Name: protocol protocol_fork_of_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.protocol
    ADD CONSTRAINT protocol_fork_of_fkey FOREIGN KEY (fork_of) REFERENCES protocols.protocol(id);


--
-- Name: protocol protocol_mask_frame_id_fkey; Type: FK CONSTRAINT; Schema: protocols; Owner: adm
--

ALTER TABLE ONLY protocols.protocol
    ADD CONSTRAINT protocol_mask_frame_id_fkey FOREIGN KEY (mask_frame_id) REFERENCES protocols.frame(id);


--
-- Name: device device_device_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: adm
--

ALTER TABLE ONLY users.device
    ADD CONSTRAINT device_device_id_fkey FOREIGN KEY (device_id) REFERENCES hardware.device(id);


--
-- Name: device device_user_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: adm
--

ALTER TABLE ONLY users.device
    ADD CONSTRAINT device_user_id_fkey FOREIGN KEY (user_id) REFERENCES users."user"(id);


--
-- Name: token token_user_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: adm
--

ALTER TABLE ONLY users.token
    ADD CONSTRAINT token_user_id_fkey FOREIGN KEY (user_id) REFERENCES users."user"(id);


--
-- PostgreSQL database dump complete
--

