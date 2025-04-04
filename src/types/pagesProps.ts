export interface inputComponent_input {
    changeHandler : Function;
    value : string;
    label : string;
    type : string;
    name : string;
    placeholder : string
    textarea : boolean
    error ?: string;
}


export interface LogoCP_props {
    color ?: string
    img_Width?: string
    fontsize?: string
}

export interface resetpassword_props {
    email : string
    token : string
    error : string
    expire :string
}