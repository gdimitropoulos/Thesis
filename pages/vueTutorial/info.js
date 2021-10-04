import React, {
    useState, useEffect, useContext, useMemo,
} from 'react';
import jwt from 'jsonwebtoken';
import { red } from '@mui/material/colors';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as moment from 'moment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockSharpIcon from '@mui/icons-material/BlockSharp';
import { CopyBlock, dracula } from "react-code-blocks";
import { Popconfirm } from 'antd';
import {
    Button,
    Grid,
    Modal,
    Container,
    Typography,
    Card,
    Box,
} from "@material-ui/core";
import appvue from "!!raw-loader!../../Components/vueTutorial/firstTutorial/appjs";
import mainjs from "!!raw-loader!../../Components/vueTutorial/firstTutorial/indexhtml";
import testing from "!!raw-loader!../../Components/vueTutorial/firstTutorial/testing";
import index from "!!raw-loader!../../Components/vueTutorial/info";
import SyntaxHighlighter from '../../Lib/syntaxHighlighter';
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    Sandpack,
    SandpackThemeProvider,
    SandpackPreview,
    FileTabs,
    useSandpack,
    useSandpackNavigation,
} from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";
import showNotification from '../../Lib/notification'
import { getAppCookies } from '../../Lib/utils'

let backspaces = 0;
const time = moment();

const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: '70vh',
    bgcolor: 'background.paper',
    borderRadius: '10%',
    boxShadow: 24,
    p: 4,
};

export default function Start() {
    const router = useRouter();
    const [openSuccess, setOpenSuccess] = useState(false);

    const Move = ()=>{
        router.push('/secondinfo')
    }
    return (

        <div style={{ height: '75%' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '75%', marginBottom: '1%', marginTop: '1%', paddingTop: '1%', paddingBottom: '3%', paddingLeft: '2%', paddingRight: '2%' }}>
                <Grid container overflow="auto" flex={1} flexDirection="column" display="flex"  >
                    <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4} key="geo">
                        <Card style={{ maxHeight: '75%', overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
                            <Typography variant="overline" style={{ width: '100%', marginBottom: '2%' }}>  Say Hello with Vue Js  </Typography>
                            <Typography variant="subtitle1" style={{ width: '100%', marginBottom: '1%' }}>  Καλώς ήρθατε στο tutorial της react! </Typography>
                            <Typography variant="subtitle1" style={{ width: '100%', marginBottom: '1%' }}> Στο πρώτο στάδιο σας ζητειται να συμπληρώσετε στο αρχείο App.js
                                έτσι ώστε να τυπώνεται το μήνυμα Hello World! </Typography>
                            <Typography variant="subtitle1" style={{ width: '100%' }}>= vue js είναι  ένα  open-source MVM front end JavaScript framework και χρησιμοποιείται ευρεως για την ανάπτυκη single page applications
                Το vue js ασχολείται κυρίως με το view κομμάτι της εφαρμογής αλλά διαθέτει επίσημμε</Typography>

                        </Card>
                    </Grid>

                    <Grid item md={12} lg={8}>
                        <Card style={{ display:'flex', flexDirection: 'column', justifyContent:'center', height: '75%', padding: "1%", width: '100%' }}>
                            <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   Vue js Tutorial  </Typography>
                            <div style={{ overflow: "auto", flex: 1, maxHeight:'75%' }}>
                                <CopyBlock
                                    text={index}
                                    language="html"
                                    showLineNumbers={true}
                                    theme={dracula}
                                    codeBlock
                                />
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={10}></Grid>
                    <Grid item xs={2} key="fot">

                            <Button variant="contained" onClick={Move} color="secondary" style={{ marginBottom: '5%' }}>
                                Παμε στο επομενο
                            </Button>

                    </Grid>
                </Grid>
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {
    const KEY = process.env.JWT_KEY;
    //console.log(process.env.JWT_KEY);
    try {
        let cookies = getAppCookies(context.req);
        let token = cookies.token;

        if (token) {
            token = token.replace('Bearer ', '');
            token = jwt.verify(token, KEY);


            return {
                props: {},
            };

        }
        else {

            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }

        }
    }
    catch (e) {
        console.error(e);
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
}

