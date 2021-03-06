import "./PicturesTablePicture.css";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import swal from 'sweetalert';
import axios from 'axios';

function PicturesTablePicture({ image, searchDate }) {
    const dispatch = useDispatch();

    const handleShowImage = () => {
        const params = new URLSearchParams(document.location.search);
        const page = parseInt(params.get('page'));
        axios.put(`/api/image/show/${image.id}`, { show: !image.show }).then((response) => {
            dispatch({ type: 'FETCH_SHOWN_IMAGES', payload: { q: searchDate, page: page } });
            dispatch({ type: "FETCH_PICTURES", payload: { q: searchDate, page: page } });
        }).catch((error) => {
            console.log(`HEY MITCH - CAN'T SHOW THE IMAGE: ${error}`);
        });
    }
    const handleDelete = () => {
        swal({
            title: "Are you sure?",
            text: `You are about to delete this image... u sho 'bout dat? `,
            icon: "error",
            dangerMode: true,
            button: "DELETE IT"
        })
            .then(willDelete => {
                if (willDelete) {
                    axios.delete(`/api/image/delete/${image.id}`)
                        .then((response) => {
                            const params = new URLSearchParams(document.location.search);
                            const page = parseInt(params.get('page'));
                            dispatch({ type: 'FETCH_SHOWN_IMAGES', payload: { q: searchDate, page: page }  });
                            dispatch({ type: "FETCH_PICTURES", payload: { q: searchDate, page: page } });
                        })
                        .catch((error) => {
                            console.log(`HEY MITCH - COULDN'T DELETE THE IMAGE: ${error}`);
                        });
                }
                else return;
            });
    }

    const formatTime = (imageTime) => {
        const time = new Date(imageTime);
        const options = { year: "2-digit", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" }
        const fd = new Intl.DateTimeFormat('en-us', options).format(time);
        return fd.toString();
    }

    return (
        <Card className="shadow mb-3 bg-white rounded card">
            <a href={image.url}>
                <Card.Img className="pix" variant="top" src={image.th_url} alt={formatTime(image.created)} min-height="256px" min-width="320px" />
            </a>
            <Card.Body className="d-flex flex-column justify-content-around align-items-center px-0">
{/*             <Card.Subtitle className="mt-0 mb-2 text-muted align-self-center"><b>{formatTime(image.created)}</b></Card.Subtitle> */}
                <ButtonGroup size="md" className="my-0">
                <Button
                variant={image.show ? "dark" : "outline-dark"}
                onClick={handleShowImage}
                type="button">
                {image.show ? <span>Hide</span> : <span>Show</span>}
            </Button>
                    <Button 
                        variant="outline-danger"
                        onClick={handleDelete}
                        type="button"
                    >Delete
                    </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
}
export default PicturesTablePicture;