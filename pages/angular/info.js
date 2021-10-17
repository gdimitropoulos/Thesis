import React, {
    useState, useEffect, useContext, useMemo,
} from 'react';
import Image from 'next/image'
import jwt from 'jsonwebtoken';
import { red } from '@mui/material/colors';
import Link from 'next/link';
import treePic from '../../public/angulartree.png'
import { useRouter } from 'next/router';
import * as moment from 'moment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockSharpIcon from '@mui/icons-material/BlockSharp';
import { CopyBlock, dracula } from "react-code-blocks";
import { Popconfirm } from 'antd';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {
    Button,
    Grid,
    Modal,
    Container,
    Typography,
    Card,
    Box,
} from "@material-ui/core";
import appvue from "!!raw-loader!../../components/VueTutorial/firstTutorial/appjs";
import mainjs from "!!raw-loader!../../components/VueTutorial/firstTutorial/indexhtml";
import testing from "!!raw-loader!../../components/VueTutorial/firstTutorial/testing";
import index from "!!raw-loader!../../components/AngularTutorial/info";
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

    const Move = () => {
        router.push('/angular/info1')
    }
    return (

        <div style={{ height: '75%' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '75%', marginBottom: '1%', marginTop: '1%', paddingTop: '1%', paddingBottom: '3%', paddingLeft: '2%', paddingRight: '2%' }}>
                <Grid container overflow="auto" flex={1} flexDirection="column" display="flex"  >
                    <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4} key="geo">
                        <Card style={{ maxHeight: '75vh', overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
                            <div style={{ height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <MenuBookIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Εκμάθηση </h3>  </div>
                            <Typography variant="subtitle1" style={{ width: '100%', marginBottom: '1%' }}> Καλώς ήρθατε στο tutorial της Angular js! </Typography>
                            <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                                H Angular js είναι ένα δομικό framework για δυναμικές εφαρμογές ιστού.
                                Eπιτρέπει να χρησιμοποιούμε την Html ως γλώσσα προτύπου καθώς και να επεκτείνουμε τη
                                σύνταξη της Html για να εκφράσουμε τα στοιχεία της εφαρμογής μας με σαφήνεια και περιεκτικότητα.
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                                Κατά την διάρκεια αυτού του tutorial στόχος είναι η εξοικείωσή σας με τα βασικά γνώρισματα της Angular
                                καθώς και με την επίσημη βιβλιοθήκη της
                                που επιτρέπει τον σχεδιασμό ενός single page application. Έτσι, δεν θα κληθείτε να αναπτύξετε ολόκληρες εφαρμογές και
                                θα έχετε πρόσβαση μόνο σε ορισμένα αρχεία, στα οποία θα χρειαστεί να δουλέψετε. Παρακάτω, παρουσιάζουμε εν συντομία έναν
                                ενδεικτικό τρόπο αρχικοποίησης ενός React πρότζεκτ.

                            </Typography>
                            <ul>
                                <li>  <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                                    O πιο δημοφιλής τρόπος αρχικοποίησης ενός Angular προτζεκτ είναι μέσω 
                                    του  <span style={{ fontWeight:'bold' }}>@angular/cli</span>. Για να καταβάσουμε το cli
                                    χρησιμοποιούμε την εντολή <span style={{ backgroundColor: '#f4f4f4' }}>npm install -g @angular/cli</span>. Για
                                    να αρχικοποιήσουμε το πρότζεκτ μας ξεκινάμε με την εντολή  <span style={{ backgroundColor: '#f4f4f4' }}>ng ng new my-app </span>. Έπειτα
                                    απο την ολοκλήρωση της αρχικοποίησης θα πρέπει η μορφή του να είναι η εξής:

                                </Typography>
                                    <Image style={{ marginTop: 5 }} src={treePic} alt="Picture of the folders tree" />
                                    <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                                        To index.html που βλέπετε  είναι  η κεντρική σελίδα στην οποία γίνεται render όλη η
                                        πληροφορία από την Angular js και πιο συγκεκριμένα στο :
                                        <CopyBlock
                                            text={'<app-root></app-root>'}
                                            language="html"
                                            showLineNumbers={false}
                                            theme={dracula}
                                            codeBlock
                                            style={{ marginTop: 10, marginBottom: 10 }}
                                        />
                                    </Typography>
                                </li>
                            </ul>
                            <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                                Πολλά απο αυτά τα αρχεία που βλέπετε είναι για testing και για διάφορα άλλα configurations με τα οποία δεν θα 
                                ασχοληθούμε σε αυτό το μάθημα. Αν θέλετε να βρείτε περισσότερες λεπομέρειες μπορείτε να τις βρείτε <a
                                    className="App-link"
                                    href="https://angular.io/docs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    εδώ
                                </a>.
                            </Typography>

                            <div style={{ height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Οδηγίες </h3>  </div>
                            <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                                Μελετήστε την θεωρία και τη μορφή του Ηtml αρχείου και όταν είστε έτοιμοι πάμε στο επόμενο!
                            </Typography>
                        </Card>
                    </Grid>

                    <Grid item md={12} lg={8}>
                        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '75vh', padding: "1%", width: '100%' }}>
                            <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   Vue js Tutorial  </Typography>
                            <div style={{ overflow: "auto", flex: 1, maxHeight: '75vh' }}>
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

                        <Button variant="contained" onClick={Move} color="secondary" style={{ marginTop: '5%', marginBottom: '5%' }}>
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

