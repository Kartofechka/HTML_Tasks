import OverCanvas from './SuperOverCanvas';
import Button from "react-bootstrap/Button"; 


export default function Page2(){
    return (
        <>
            <OverCanvas head_text='Вторая страница' body_text='Какой то  текст второй страницы'></OverCanvas>
            <Button variant="primary">Кнопка</Button>
        </>
    )
}