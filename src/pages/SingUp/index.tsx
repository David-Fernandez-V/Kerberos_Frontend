import RegistrationForm from "./RegistrationForm"

type Props = {}

function SignUp({}: Props) {
  return (
    <div style={{height: "calc(100vh - 64px)"}}>
      <RegistrationForm/>
    </div>
  )
}

export default SignUp