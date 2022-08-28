import './index.scss'

export default function DivContainer({children}){
    return (
        <div
            className="custom-div"
        >
            {children}
        </div>
    )
}