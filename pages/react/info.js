import React, {
    useState, useEffect, useContext, useMemo,
} from 'react';
import Image from 'next/image'
import jwt from 'jsonwebtoken';
import { red } from '@mui/material/colors';
import Link from 'next/link';
import treePic from '../../public/createReactApptree.png'
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
import index from "!!raw-loader!../../components/reactTutorial/info";
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
        router.push('/react/info1')
    }
    return (

        <div style={{ height: '75%' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '75%', marginBottom: '1%', marginTop: '1%', paddingTop: '1%', paddingBottom: '3%', paddingLeft: '2%', paddingRight: '2%' }}>
                <Grid container overflow="auto" flex={1} flexDirection="column" display="flex"  >
                    <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4} key="geo">
                        <Card style={{ maxHeight: '75vh', overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
                        <div style={{ height: '40px', backgroundColor: '#f4f4f4',display: 'flex', justifyContent:'Center' }}>  <MenuBookIcon style={{ fontSize: 30}} />  <h3 style={{ marginLeft: '5px', display: 'flex' , flexDirection: 'column' ,justifyContent: 'center'}}>Εκμάθηση </h3>  </div>
                            <Typography variant="subtitle1" style={{ width: '100%', marginBottom: '1%' }}> Καλώς ήρθατε στο tutorial της React js! </Typography>
                            <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}> 
                                Η React είναι η πιο δημοφιλής βιβλιοθήκη JavaScript στο χώρο της ανάπτυξης ιστοσελίδων.
                                Σχεδιάστηκε για τη δημιουργία γρήγορων και διαδραστικών διεπαφών χρήστη για εφαρμογές ιστού και κινητών. 
                                Πρόκειται για μια βιβλιοθήκη ανοιχτού κώδικα, βασισμένη σε  <span style={{fontStyle:'italic'}}>Components</span> και είναι υπεύθυνη για το View επίπεδο της εφαρμογής
                                 δηλαδή για την εμφάνιση και την αίσθηση της εφαρμογής. 
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: '2%' , textAlign: 'justify',width: '100%' }}> 
                            Κατά την διάρκεια αυτού του tutorial στόχος είναι η εξοικείωσή σας με τα βασικά γνώρισματα της React καθώς και με την 
                            επίσημη βιβλιοθήκη της
                            που επιτρέπει τον σχεδιασμό ενός single page application. Έτσι, δεν θα κληθείτε να αναπτύξετε ολόκληρες εφαρμογές και
                            θα έχετε πρόσβαση μόνο σε ορισμένα αρχεία, στα οποία θα χρειαστεί να δουλέψετε. Παρακάτω, παρουσιάζουμε εν συντομία έναν
                             ενδεικτικό τρόπο αρχικοποίησης ενός React πρότζεκτ.
                    
                            </Typography>
                            <ul>
                                <li>  <Typography variant="subtitle1" style={{ marginTop: '2%' , textAlign: 'justify',width: '100%' }}> 
                             O πιο δημοφιλής τρόπος αρχικοποίησης ενώς React Single Page Application είναι μέσω του <span style={{fontStyle:'italic'}}>create-react-app</span>. 
                             Xρησιμοποιούμε την εντολή <span style={{backgroundColor:'#f4f4f4'}}>npx create-react-app my-app </span> 
                              για να αρχικοποιήσουμε το πρότζεκτ μας. Έπειτα απο την ολοκλήρωση της αρχικοποίησης θα πρέπει η μορφή του να είναι η εξής:

                            </Typography>
                            <Image style={{ marginTop: 5}} src={treePic} alt="Picture of the folders tree" />
                            <Typography variant="subtitle1" style={{ marginTop: '2%' , textAlign: 'justify',width: '100%' }}>
                                To index.html που βλέπετε  είναι  η κεντρική σελίδα στην οποία γίνεται render όλη η 
                                πληροφορία από την React js και πιο συγκεκριμένα στο :
                                <CopyBlock
                                    text={'<div id="root"></div>'}
                                    language="html"
                                    showLineNumbers={false}
                                    theme={dracula}
                                    codeBlock
                                    style={{ marginTop: 10, marginBottom: 10}}
                                />
                            </Typography>
                            </li>
                            </ul>
                          
                <div style={{ height: '40px', backgroundColor: '#f4f4f4',display: 'flex', justifyContent:'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30}} />  <h3 style={{ marginLeft: '5px', display: 'flex' , flexDirection: 'column' ,justifyContent: 'center'}}>Οδηγίες </h3>  </div>
                <Typography variant="subtitle1" style={{ marginTop: '2%' , textAlign: 'justify',width: '100%' }}> 
                        Μελετήστε την θεωρία και τη μορφή του Ηtml αρχείου και όταν είστε έτοιμοι πάμε στο επόμενο!
                 </Typography>
                        </Card>
                    </Grid>

                    <Grid item md={12} lg={8}>
                        <Card style={{ display:'flex', flexDirection: 'column', justifyContent:'center', height: '75vh', padding: "1%", width: '100%' }}>
                            <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   Vue js Tutorial  </Typography>
                            <div style={{ overflow: "auto", flex: 1, maxHeight:'75vh' }}>
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

                            <Button variant="contained" onClick={Move} color="secondary" style={{ marginTop: '5%' , marginBottom: '5%' }}>
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

