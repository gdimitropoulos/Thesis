import React, {
    useState,
} from 'react';
import Image from 'next/image'
import jwt from 'jsonwebtoken';
import treePic from '../../public/treefolders.png'
import { useRouter } from 'next/router';
import * as moment from 'moment'
import { CopyBlock, dracula } from "react-code-blocks";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
    Button,
    Grid,
    Typography,
    Card,
} from "@material-ui/core";
import index from "!!raw-loader!../../components/VueTutorial/info";
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

export default function VueInfo() {
    const router = useRouter();
    const [openSuccess, setOpenSuccess] = useState(false);

    const goBack = () => {
        router.push('/user/dashboard')
    }
    const Move = () => {
        router.push('/vueTutorial/info1')
    }
    return (

        <div style={{ height: '75%' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '75%', marginBottom: '1%', marginTop: '1%', paddingTop: '1%', paddingBottom: '3%', paddingLeft: '2%', paddingRight: '2%' }}>
                <Grid container overflow="auto" flex={1}  display="flex"  >
                    <Grid style={{ display: "flex", flex: 1 }} item md={12} lg={4} key="geo">
                        <Card style={{ maxHeight: '75vh', overflow: "auto", flex: 1, flexDirection: "column", display: "flex", padding: '2%' }}>
                            <div style={{ height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <MenuBookIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>???????????????? </h3>  </div>
                            <Typography variant="subtitle1" style={{ width: '100%', marginBottom: '1%' }}> ?????????? ???????????? ?????? tutorial ?????? Vue js! </Typography>
                            <Typography variant="subtitle1" style={{ textAlign: 'justify', width: '100%' }}>
                                ?? Vue js ?????????? ?????? ?????????????????? JavaScript framework ?????? ?????????????????????????????? ?????? ?????? ????????????????
                                ???????????????????????? ???????????????????????? ????????????????. ???????? ?????? ???????????????? ?????? Vue ???????????? ?????????????? ???? ?????????????????? ???????????????????? ???????????? ???????? ???????????????????? ??????
                                ?????? ???????????? ???? ?????????????? ?????? ??????????????????????????, ?????????????? ?????? ?????? ?????????????? ???????????? ???????? ???????? ?????????? ??????????????.
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                                ???????? ?????? ???????????????? ?????????? ?????? tutorial ???????????? ?????????? ?? ???????????????????? ?????? ???? ???? ???????????? ???????????????????? ?????? Vue ?????????? ?????? ???? ?????? ?????????????? ???????????????????? ??????
                                ?????? ?????????????????? ?????? ?????????????????? ???????? single page application. ????????, ?????? ???? ???????????????? ???? ???????????????????? ?????????????????? ?????????????????? ??????
                                ???? ?????????? ???????????????? ???????? ???? ???????????????? ????????????, ?????? ?????????? ???? ?????????????????? ???? ??????????????????. ????????????????, ?????????????????????????? ???? ???????????????? ???????? ???????????????????? ?????????? ?????????????????????????? ???????? Vue js ????????????????.

                            </Typography>
                            <ul>
                                <li>  <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                                    O ?????? ?????????????????? ???????????? ?????????????????????????? ?????????? ???????? ?????? Vue CLI. ?????? ???? ?????????????????????? ???? Vue CLI ???????????????? ?????? ???????????? <span style={{ backgroundColor: '#f4f4f4' }}>npm install -g @vue/cli</span> ?????? terminal

                                </Typography></li>
                                <li>  <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                                    ???????????? ?????????????????????????????? ?????? ???????????? <span style={{ backgroundColor: '#f4f4f4' }}>vue create ??????????_????????????????</span> ????????????????
                                     ???? ???????????????????????????? ???? ???????????????? ??????, ???? ?????????? ?????? ?????? ?????? ?????????????????? ???????????? ?????? Vue ???? ???????? ?????? ???????? ?????????? :
                                </Typography>
                                    <Image style={{ marginTop: 5 }} src={treePic} alt="Picture of the folders tree" />
                                    <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                                        To index.html ?????? ??????????????  ??????????  ?? ???????????????? ???????????? ???????? ?????????? ?????????????? render ?????? ??
                                        ???????????????????? ?????? ?????? Vue js ?????? ?????? ???????????????????????? ?????? :
                                        <CopyBlock
                                            text={'<div id="app"></div>'}
                                            language="html"
                                            showLineNumbers={false}
                                            theme={dracula}
                                            codeBlock
                                            style={{ marginTop: 10, marginBottom: 10 }}
                                        />
                                    </Typography>
                                </li>
                            </ul>

                            <div style={{ height: '40px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'Center' }}>  <CheckCircleOutlineIcon style={{ fontSize: 30 }} />  <h3 style={{ marginLeft: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>?????????????? </h3>  </div>
                            <Typography variant="subtitle1" style={{ marginTop: '2%', textAlign: 'justify', width: '100%' }}>
                                ?????????????????? ??????  ???????????? ?????? ???? ?????????? ?????? html ?????????????? ?????? ???????? ?????????? ?????????????? ???????? ?????? ??????????????!
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

                    <Grid item xs={8}></Grid>
                    <Grid item xs={2} key="fot">
                        <Button variant="contained" onClick={goBack} color="primary" style={{ minWidth: 200, marginTop: '4%', marginBottom: '2%' }}>
                             ????????
                        </Button>
                    </Grid>

                    <Grid item xs={2} key="fot1">

                        <Button variant="contained" onClick={Move} color="primary" style={{  minWidth: 200, marginTop: '5%', marginBottom: '5%' }}>
                             ??????????????
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

