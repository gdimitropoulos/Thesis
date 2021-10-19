import React, {
    useState,
} from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import {
    Button,
    Container,
    Typography,
    Card,
    Box,
    Modal,
} from "@material-ui/core";
import { checkTutorialFinished, checkIntroForm, checkFinishForm } from '../../Lib/dao'
import { getAppCookies } from '../../Lib/utils'

const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30vw',
    height: '40vh',
    bgcolor: 'background.paper',
    borderRadius: '10%',
    boxShadow: 24,
    p: 4,
};


export default function Home({ react, angular, vue, introForm, finishForm, email }) {
    console.log(react)
    console.log(vue);
    console.log(angular)
    const [openIntroForm, setOpenIntroForm] = useState(!introForm);
    const [openFinishForm, setOpenFinishForm] = useState(!finishForm);
    const router = useRouter();

    const handleClick = async () => {
        const res = await fetch('/api/introForm', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }
    const handleFinishClick = async () => {
        const res = await fetch('/api/finishForm', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }
    const handleCloseIntroForm = () => {
        setOpenIntroForm(false);
    }
    const handleCloseFinishForm = () => {
        setOpenFinishForm(false);
    }
    const handleReact = async (event) => {
        await router.push('/react/info')
    };
    const handleVue = async (event) => {
        await router.push('/vueTutorial/info')
    };
    const handleAngular = async (event) => {
        await router.push('/angular/start')
    };


    return (

        <div >
            <Container maxWidth="m" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '80%', marginBottom: '2%', marginTop: '5%', padding: '3%' }}>
                <Box>
                    <Typography variant="h4" align="center" style={{ marginBottom: '2%' }}>
                        Καλώς ήρθατε!
                    </Typography>
                    <Typography variant="h5" align="center" style={{ marginBottom: '3%' }}> Μέσω της ιστοσελίδας <span style={{ fontStyle:"italic"}}>
                        Web Frameworks Tutorials</span> θα γνωρίσετε σε 
                    εισαγωγικό επίπεδο τα τρία πιο δημοφιλή Front-end Frameworks και τις βασικές τους λειτουργίες που τα καθιστούν κατάλληλα για την ανάπτυξη 
                    ενός single page application.
                       </Typography>

                </Box>
                <Card style={{ width: '50%', padding: '1%', display: 'flex', justifyContent: 'space-around', marginBottom: '5%' }}>
                    <Typography variant="overline">   React Tutorial  </Typography>
                    <Button size="small" variant="contained" color={react ? "success" : 'primary'} onClick={handleReact}>
                        {react ? "Ολοκληρωμενο" : 'Πατηστε εδω'}
                    </Button>
                </Card>
                <Card style={{ width: '50%', padding: '1%', display: 'flex', justifyContent: 'space-around', marginBottom: '5%' }}>
                    <Typography variant="overline">    Angular Tutorial    </Typography>
                    <Button size="small" variant="contained" color={angular ? "success" : 'primary'} onClick={handleAngular}>
                        {angular ? "Ολοκληρωμενο" : 'Πατηστε εδω'}
                    </Button>
                </Card>
                <Card style={{ width: '50%', padding: '1%', display: 'flex', justifyContent: 'space-around', marginBottom: '5%' }}>
                    <Typography variant="overline">  Vue tutorial    </Typography>
                    <Button onClick={handleVue} size="small" variant="contained" color={vue ? "success" : 'primary'} >
                        {vue ? "Ολοκληρωμενο" : 'Πατηστε εδω'}
                    </Button>
                </Card>

                <Modal
                    keepMounted
                    open={openIntroForm}
                    onClose={handleCloseIntroForm}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Card styles={{ padding: '1%' }}>

                        <Box sx={style} >
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            </div>
                            <Box style={{ marginLeft: '2%', marginRight: '2%', display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                                <Typography style={{ marginTop: '2%' }} align="center" id="keep-mounted-modal-description" >
                                    Καλώς ήρθατε, παρακαλούμε πριν προχωρήσετε   συμπληρώστε  <a href="https://docs.google.com/forms/d/e/1FAIpQLSc5i1pkv3XpxNQqCJp504DvED8TmqnvsyAQ6OUABO7dfWEdog/viewform?usp=sf_link"
                                        rel="noreferrer"
                                        target="_blank"
                                        onClick={handleClick}
                                    >
                                        αυτή
                                    </a> την φόρμα.
                                </Typography>
                            </Box>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <Button size="large" style={{ width: '40%', marginBottom: '1%', marginTop: '10%' }} variant="contained" color="primary" onClick={handleCloseIntroForm}>CLOSE</Button>
                            </div>
                        </Box>
                    </Card>

                </Modal>

                <Modal
                    keepMounted
                    open={openFinishForm}
                    onClose={handleCloseFinishForm}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Card styles={{ padding: '1%' }}>

                        <Box sx={style} >
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            </div>
                            <Box style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                                <Typography style={{ marginTop: '2%' }} align="center" id="keep-mounted-modal-description" >
                                    Ευχαριστούμε που ολοκληρώσατε και τα τρία tutorials. Ελπίζουμε να σας βοήθησαν να εμπλουτίσετε τις γνώσεις σας.
                                    Παρακαλούμε πριν αποχωρήσετε να συμπληρώστε  <a href="https://docs.google.com/forms/d/e/1FAIpQLSeI6NgH6EccFzdyoaYZA3ngWnpn34KGLedCTi34t1v8M5HbeQ/viewform?usp=sf_link"
                                        rel="noreferrer"
                                        target="_blank"
                                        onClick={handleFinishClick}
                                    >
                                        αυτή
                                    </a> την φόρμα.
                                </Typography>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <Button size="large" style={{ width: '40%', marginBottom: '1%', marginTop: '10%' }} variant="contained" color="primary" onClick={handleCloseFinishForm}>CLOSE</Button>
                                </div>
                            </Box>
                        </Box>
                    </Card>

                </Modal>
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
        let finishForm = true;
        if (token) {
            token = token.replace('Bearer ', '');
            token = jwt.verify(token, KEY);
            const angular = await checkTutorialFinished('angular', token.email)
            const react = await checkTutorialFinished('react', token.email)
            const vue = await checkTutorialFinished('vue', token.email)
            const introForm = await checkIntroForm(token.email);
            console.log(introForm)
            if (vue && react && angular) {
                finishForm = await checkFinishForm(token.email);
            } else {
                finishForm = true;
            }

            return {
                props: {
                    angular,
                    react,
                    vue,
                    introForm,
                    finishForm,
                    email: token.email
                },
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

