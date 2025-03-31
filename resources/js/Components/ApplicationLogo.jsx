import logo from "../../assets/images/logo1.png";
export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src={logo}
            alt="Logo web"
        />
    );
}
