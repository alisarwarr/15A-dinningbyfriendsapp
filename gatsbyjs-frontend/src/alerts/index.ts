//SWEETALERT2
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
//GATSBY
import { navigate } from 'gatsby';







export const darkAlert = (dark: boolean) => {
    Swal.fire({
        icon: 'info',
        title: `<p id="design">${!dark ? `Dark` : `Light`}</p>`,
        text: `You enabled ${!dark ? `Dark` : `Light`} Theme!`,
        timer: 2000,
        showConfirmButton: false
    })
}

export const successAlert = (text: string) => {
    Swal.fire({
        icon: 'success',
        title: `<p id="design">successfully ${text}!</p>`,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
    })
}

export const errorAlert = (text: string, error: string) => {
    Swal.fire({
        icon: 'error',
        title: `<p id="design">Can't ${text}!</p>`,
        text: `${error}`,
        confirmButtonText: 'Retry'
    })
}

export const pageAlert = (title: string) => {
    Swal.fire({
        icon: 'info',
        title: `<p id="design">${title}</p>`,
        text: `welcome to ${title} page`,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
    })
}

export const toastAlert = (title = 'Something happened', position?: SweetAlertPosition, alertType?: SweetAlertIcon, width = '14.475rem'): void => {
    Swal.fire({
        title,
        icon: alertType,
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true,
        toast: true,
        position,
        width,
        //CSS classes for animations when showing a popup (fade in)
        showClass: {
            popup: 'swal2-noanimation',
            backdrop: 'swal2-noanimation'
        },
        //CSS classes for animations when hiding a popup (fade out)
        hideClass: {
            popup: '',
            backdrop: ''
        }
    })
}

export const userProfileInputAlert = () => {
    Swal.fire({
        title: `Enter User's Name`,
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Enter',
        showLoaderOnConfirm: true,
        preConfirm: (name: string) => {
            if(name === "") {
                Swal.fire({
                    icon: 'warning',
                    title: '<p id="design">Cancelled</p>',
                    text: `You need to give User's name!`,
                    confirmButtonText: 'Retry'
                })
            }
            else if(name) {
                navigate(`/userprofile/${name}`);
            }        
        }
    })
}

export const restaurantProfileInputAlert = () => {
    Swal.fire({
        title: `Enter Restaurant's Name`,
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Enter',
        showLoaderOnConfirm: true,
        preConfirm: (name: string) => {
            if(name === "") {
                Swal.fire({
                    icon: 'warning',
                    title: '<p id="design">Cancelled</p>',
                    text: `You need to give Restaurant's name!`,
                    confirmButtonText: 'Retry'
                })
            }
            else if(name) {
                navigate(`/restaurantprofile/${name}`);
            }        
        }
    })
}

export const notSignedinAlert = () => {
    Swal.fire({
        icon: 'error',
        title: `<p id="design">Cancelled</p>`,
        text: `You must SignedIn your account!`,
        confirmButtonText: 'Yeah',
        confirmButtonColor: '#7367f0',
        showCancelButton: true,
        cancelButtonText: 'Later',
        cancelButtonColor: '#a7dc3e'
    })
    .then((result) => {
        if(result.value) {
            //handle Confirm button onClick
            navigate('/signin');
        }
        else {
            //result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
        }
    })
}