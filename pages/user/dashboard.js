import React, {
    useState, useEffect, useContext, useMemo,
} from 'react';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    Button,
    TextField,
    Grid,
    Paper,
    Container,
    AppBar,
    Typography,
    Toolbar,
    Card,
    CardContent,
    FormControl,
    FormGroup,
    Box,
    FormControlLabel,
} from "@material-ui/core";
import green from '@material-ui/core/colors/green';

import localFile from "!!raw-loader!../../components/AppFooter";
import Cookies from 'js-cookie';
import { Layout } from 'antd';
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackThemeProvider,
    SandpackPreview,
    FileTabs,
    useSandpack,
} from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";
import styles from '../../styles/Home.module.css'
import showNotification from '../../Lib/notification'
import { getAppCookies } from '../../Lib/utils'

export default function Home() {
    const { Sider, Content } = Layout;
    const router = useRouter();
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);

    const handleReact =  async (event) => {
        await router.push('/react/info')
    };
    const handleVue =  async (event) => {
        await router.push('/VueTutorial/info')
    };
    const handleAngular=  async (event) => {
        await router.push('/angular/start')
    };


    return (
        
        <div style={{ height: '60%' }}>
        <Container maxWidth="m" style={{ display: 'flex', alignItems: 'center' , flexDirection: 'column', justifyContent: 'center', height: '80%', marginBottom: '5%', marginTop: '5%', padding: '3%' }}>
                <Box>
                    <Typography variant= "subtitle1" align= "center" style={{ marginBottom: '2%'}}>   Καλώς ήρθατε! Στην ιστοσελίδα αυτήν μπορείτε να 
                        πάρετε μέρος στην συγκριτκή  έρευνα που γίνεται πάνω σε single page application frameworks.Θα χρειαστεί να πραγματοποιήσετε τα τρία tutorials
                         πάνω στις τεχνολογίες που πραγματεύεται η έρευνα και έπειτα να απαντήσετε σε κάποιες σύντομες ερωτήσεις.  </Typography>  

                </Box>
                <Card style= {{ width: '50%' ,padding: '1%' , display: 'flex', justifyContent: 'space-around', marginBottom: '5%'}}>
                 <Typography variant= "overline">   React Tutorial  </Typography>  
                 <Button  size="small" variant="contained" color="secondary" onClick={handleReact}>
              Πατηστε εδω
            </Button> 
                </Card>
                <Card style= {{ width: '50%' ,padding: '1%' , display: 'flex', justifyContent: 'space-around', marginBottom: '5%'}}>
                <Typography variant= "overline">    Angular Tutorial    </Typography>    
                <Button  size="small" variant="contained" color="primary" onClick={handleAngular}>
                Πατηστε εδω
            </Button>                  
                </Card>
                <Card style= {{ width: '50%' ,padding: '1%' , display: 'flex', justifyContent: 'space-around', marginBottom: '5%'}}>
                <Typography variant= "overline">  Vue tutorial    </Typography>  
                <Button   onClick={handleVue} size="small" variant="contained" color="error" >
                Πατηστε εδω
            </Button> 
                </Card>
            </Container>
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

