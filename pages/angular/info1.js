import React, {
    useState, useEffect, useContext, useMemo,
} from 'react';
import Image from 'next/image'
import jwt from 'jsonwebtoken';
import treePic from '../../public/angularappmodule.png'
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
import maints from "!!raw-loader!../../components/AngularTutorial/maints";
import appcomponentjs from "!!raw-loader!../../components/AngularTutorial/appcomponent";
import appmodule from "!!raw-loader!../../components/AngularTutorial/appmodule";
import { getAppCookies } from '../../Lib/utils'

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
        router.push('/angular/start')
    }
    return (

        <div style={{ height: '75%' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '75%', marginBottom: '1%', marginTop: '1%', paddingTop: '1%', paddingBottom: '3%', paddingLeft: '2%', paddingRight: '2%' }}>
                <Grid container overflow="auto" flex={1} flexDirection="column" display="flex"  >
                    <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4} key="geo">
                        <Card style={{ maxHeight: '75vh', overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
                            <div style={{ height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <MenuBookIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Εκμάθηση </h3>  </div>
                            <Typography variant="h6" style={{ width: '100%', marginBottom: '2%', marginTop: '2%' }}> Επεξήγηση βασικών αρχείων </Typography>
                            <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                                Τo πρώτο αρχείο που θα ανεφερθούμε αυτό το app.module.
                            </Typography>
                            <div style={{ marginTop: 15 }}>
                                <Image style={{ marginTop: 5 }} src={treePic} alt="Picture of the folders tree" />
                            </div>

                            <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                                Tο <span style={{ fontStyle: 'italic' }}>@NgModule</span> γίνεται import από την <span style={{ fontStyle: 'italic' }}>@angular/core </span> και περιέχει τις ακόλουθες ιδιότητες:
                                <ul>
                                    <li>
                                    <span style={{ fontWeight: 'bold' }}>Declarations</span>: Στα declarations, δηλώνουμε τα  components.
                                        To AppComponent είναι το default component που δημιουργείται σε κάθε angular πρότζεκτ.
                                    </li>
                                    <li>
                                    <span style={{ fontWeight: 'bold' }}>Imports</span> − Εδώ θα υπάρχουν τα  modules που χρειαζόμαστε.
                                        Για αρχή,έχουμε το default  BrowserModule που γίνεται import από το
                                        @angular/platform-browser.
                                    </li>
                                    <li>
                                    <span style={{ fontWeight: 'bold' }}>Providers</span> − Εδώ θα κάνουμε δήλωσε των services .
                                        Θα μιλήσουμε για αυτά αργότερα στο tutorial.
                                    </li>
                                    <li>
                                    <span style={{ fontWeight: 'bold' }}>Bootstrap</span> − Εδώ κάνουμε δήλωση ενός default  component (π.χ AppComponent )  .
                                    </li>
                                    <li>
                                    <span style={{ fontWeight: 'bold' }}>app.component.css</span> − Εδώ κάνουμε import το αρχείο με την css που θα μπεί στο app component.
                                    </li>
                                </ul>

                                Μέσα στον φάκελο app θα περιέχονται όλοι οι φάκελοι μας.
                                Στο αρχικοποιημένο πρόγραμμα μπορούμε να διακρίνουμε το default app component. Ας δούμε την δομή του :

                                <CopyBlock
                                    text={appcomponentjs}
                                    language="typescript"
                                    showLineNumbers={false}
                                    theme={dracula}
                                    codeBlock
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                />


                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }} >
                                Στo <span style={{ fontWeight: 'bold' }}>App.component.ts</span> είναι δηλωμένο το component app. Αυτήν την δομή θα ακολουθούμε σε κάθε component που θα αρχικοποιούμε!
                                Παρατηρούμε τις ιδιότητες selector, styleUrls, templateUrl. Στο selector δηλώνουμε το όνομα με το οποίο θα χρησιμοποιείται στο application
                                αυτο το component. Το templateUrl είναι το path για το html template που έχει το component μας ενώ το stylesUrl περιέχει την css.
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }} >
                                Αξίζει να αναφερθούμε επίσης στο <span style={{ fontWeight: 'bold' }}>main.ts</span>. Στο φάκελο αυτόν αρχικοποιούμε
                                το προτζεκτ αφου πρώτα κάνουμε import τα βασικά modules. Μην αγχώνεστε αν δεν καταλαβαίνετε τα πάντα δεν
                                χρειάζεται σε αυτό το στάδιο!

                            </Typography>
                

                            <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }} >
                                Όσον αφορά τα υπόλοιπα αρχεία, ο φάκελος assets χρησιμοποιείται  για να μπορούμε
                                να κάνουμε import στο πρότζεκτ μας στατικά αρχεία, όπως π.χ. εικόνες. Εδώ πρέπει να σημειώσουμε ότι
                                στο εισαγωγικό αυτό tutorial δεν θα εξηγήσουμε με λεπτομέρεια τα πάντα αλλά θα κάνουμε μια γενική εισαγωγή. Αν θέλετε να μελετήσετε
                                παραπάνω τα βάσικα στοιχεία της React μπορείτε να βρείτε το documentation  <a
                                    className="App-link"
                                    href="https://reactjs.org/docs/getting-started.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    εδώ
                                </a> .
                            </Typography>

                            <div style={{ height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Οδηγίες </h3>  </div>
                            <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                                Μελετήστε την  θεωρία όταν είστε έτοιμοι πάμε στο επόμενο!
                            </Typography>
                        </Card>
                    </Grid>

                    <Grid item md={12} lg={8}>
                        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '75vh', padding: "1%", width: '100%' }}>
                            <Typography variant="overline" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>   React Tutorial  </Typography>


                            <div style={{ overflow: "auto", flex: 1, maxHeight: '75vh' }}>
                                <div>
                                    <Box sx={{ width: '100%', marginTop: '2%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example" indicatorColor="primary"
                                                textColor="primary">
                                                <Tab label="app.module.ts" {...a11yProps(0)} />
                                                <Tab label="app.component.ts" {...a11yProps(1)} />
                                                <Tab label="main.ts" {...a11yProps(2)} />
                                            </Tabs>
                                        </Box>
                                        <TabPanel value={value} index={1}>
                                            <CopyBlock
                                                text={appcomponentjs}
                                                language="typescript"
                                                showLineNumbers={true}
                                                theme={dracula}
                                                codeBlock
                                            />
                                        </TabPanel>
                                        <TabPanel value={value} index={0}>
                                            <CopyBlock
                                                text={appmodule}
                                                language="actionscript"
                                                showLineNumbers={true}
                                                theme={dracula}
                                                codeBlock
                                            />
                                        </TabPanel>
                                        <TabPanel value={value} index={2}>
                                            <CopyBlock
                                                text={maints}
                                                language="typescript"
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
        </div >
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
