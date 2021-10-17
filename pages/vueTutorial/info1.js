import React, {
    useState, 
} from 'react';
import Image from 'next/image'
import jwt from 'jsonwebtoken';
import treePic from '../../public/treefoldersapp.png'
import { useRouter } from 'next/router';
import { CopyBlock, dracula } from "react-code-blocks";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
    Button,
    Grid,
    Typography,
    Card,
    Tabs,
    Tab,
    Box,
} from "@material-ui/core";
import index from "!!raw-loader!../../components/VueTutorial/info1";
import index1 from "!!raw-loader!../../components/VueTutorial/info1app";
import { getAppCookies } from '../../Lib/utils'


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

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function Info1() {
    const router = useRouter();
    const [value, setValue] = useState(0);
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const Move = () => {
        router.push('/vueTutorial/start')
    }
    return (

        <div style={{ height: '75%' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '75%', marginBottom: '1%', marginTop: '1%', paddingTop: '1%', paddingBottom: '3%', paddingLeft: '2%', paddingRight: '2%' }}>
                <Grid container overflow="auto" flex={1} flexDirection="column" display="flex"  >
                    <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4} key="geo">
                        <Card style={{ maxHeight: '75vh', overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
                            <div style={{ height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <MenuBookIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Εκμάθηση </h3>  </div>
                            <Typography variant="h6" style={{ width: '100%', marginBottom: '1%' }}> Επεξήγηση βασικών αρχείων </Typography>
                            <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                                Τα δύο βασικά αρχεία τα οποία θα υπάρχουν πάντα σε ένα project Vue js είναι το
                                App.vue και το main.js που αρχικοποιούνται κατευθείαν απο το Vue-cli όπως αναφέρθηκε προηγουμένως.
                            </Typography>
                            <div style={{ marginTop: 15 }}>
                                <Image style={{ marginTop: 5 }} src={treePic} alt="Picture of the folders tree" />
                            </div>

                            <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                                To main.js  που βλέπετε πρώτα είναι ο φάκελος που δέχεται ολόκληρο το  application και το κάνει render στην
                                html μέσω των  μεθόδων createApp() και mount() που μας  διαθέτει το framework.
                                { /* 
                         <CopyBlock
                                    text={'<div id="app"></div>'}
                                    language="javascript"
                                    showLineNumbers={false}
                                    theme={dracula}
                                    codeBlock
                                    style={{ marginTop: 10, marginBottom: 10}}
                                />
                        */}

                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }} >
                                To App.vue είναι ο πυρήνας του application και στο οποίο μαζεύουμε όλα τα components και όλη την πληροφορία
                                από τους φακέλους μας ώστε να ομαδοποιηθούν σωστά και να περαστούν στην οθόνη μέσω του main.js.
                                Έχει πολύ ενδιαφέρον σε αυτό το σημείο να εξηγήσουμε το App.vue δεδομένου ότι περιέχει το συντακτικό με το οποίο θα γράφουμε
                                όλα μας τα αρχεία μας.
                            </Typography>
                            <ul>
                                <li>
                                <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }} >
                              {`To πρώτο  που παρατηρεί κάνεις είναι η δομή   <template> , που αποτελεί το πρώτο κομμάτι του αρχείου.
                                H δομή αυτή, εξυπηρετεί τον ίδιο ρόλο με την html δίνοντας μας πολλές δυνατότητες όσον αφορά την δυναμικότητα και 
                                την ευελιξία που μπορούμε να έχουμε στον κώδικα μας.`}
                            </Typography>
                                </li>
                                <li>
                                <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }} >
                              {`Έπειτα ακολουθεί η <script> δομή στην οποία μέσω του συντακτικού της Vue μπορούμε να διαχειριζόμαστε δεδομένα, components κ.ά.`}
                            </Typography>
                                </li>
                                <li>
                                <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }} >
                              {`Τέλος έχουμε  την <style> δομή, στην οποία προσθέτουμε όλη την css που χρειαζομάστε.`}
                            </Typography>
                                </li>
                            </ul>
                            
                            <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }} >
                               Όσον αφορά τα υπόλοιπα αρχεία, ο φάκελος public και ο  φάκελος assets χρησιμοποιούνται για να μπορούμε 
                               να κάνουμε import στατικά αρχεία, όπως π.χ. εικόνες , στο πρότζεκτ μας ενώ ο φάκελος test μας προσφέρεται 
                               από την Vue για να διευκολύνει την διαδικασία του testing όπως π.χ. με την τεχνολογία jest.
                            </Typography>

                            <div style={{ height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Οδηγίες </h3>  </div>
                            <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                                Μελετήστε την  θεωρία και τη μορφή του html αρχείου και όταν είστε έτοιμοι πάμε στο επόμενο!
                            </Typography>
                        </Card>
                    </Grid>

                    <Grid item md={12} lg={8}>
                        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '75vh', padding: "1%", width: '100%' }}>
                            <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   Vue js Tutorial  </Typography>


                            <div style={{ overflow: "auto", flex: 1, maxHeight: '75vh' }}>
                                <div>
                                    <Box sx={{ width: '100%', marginTop: '2%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example" indicatorColor="primary"
                                                textColor="primary">
                                                <Tab label="App.vue" {...a11yProps(0)} />
                                                <Tab label="main.js" {...a11yProps(1)} />
                                            </Tabs>
                                        </Box>
                                        <TabPanel value={value} index={1}>
                                            <CopyBlock
                                                text={index}
                                                language="javascript"
                                                showLineNumbers={true}
                                                theme={dracula}
                                                codeBlock
                                            />
                                        </TabPanel>
                                        <TabPanel value={value} index={0}>
                                            <CopyBlock
                                                text={index1}
                                                language="html"
                                                showLineNumbers={true}
                                                theme={dracula}
                                                codeBlock
                                            />
                                        </TabPanel>
                                    </Box>
                                </div>

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
