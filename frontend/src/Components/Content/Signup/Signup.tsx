import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useMultiStepForm } from "../../../hooks/useMultiStepForm"
import AccountType from "./AccountType/AccountType"
import BankVerification from "./BankVerification/BankVerification"
import PersonalInfo from "./PersonalInfo/PersonalInfo"
import ResidencyInfo from "./ResidencyInfo/ResidencyInfo"
import { FcGoogle } from "react-icons/fc"
import { FcLock } from "react-icons/fc";
import business  from "../../../assets/individual.png"
import individual  from "../../../assets/business.png"
import { toast } from 'react-toastify'
import { IoChevronBack } from "react-icons/io5";
import  { useAuth }  from "../../../hooks/useAuth"
import axios from "axios"
import "./signup.css"




import { 
  Button,
  Col,
  Flex, 
  Form, 
  Row, 
  FormProps,
  Typography,
  Divider,
} from "antd"
import Empty from "./AccountType/Empty"
const {
  Text,
  Title
} = Typography
type FieldType = {
  user_type: 1 | 2,
  full_name: string,
  email: string,
  password: string,
  code: string,
  phone: string,
  address: string,
  country: string,
  bvn: number
}

const Signup = () => {
  const [formState, setFormState] = useState({
    user_type: 1,
    full_name: "",
    email: "",
    password: "",
    code: "+92",
    phone: "",
    address: "",
    country: "Pakistan",
    bvn: null
  })
  const {currentStepIndex,  step, steps, firstStep, lastStep, next,  back } = useMultiStepForm(
    [
      {
        title: "Step title number",
        heading: "Join Us!",
        description: "To begin this journey, tell us what type of account you’d be opening.",
        Element: <Empty/>
      },
      {
        title: "Personal Info.",
        heading: "Register Individual Account!",
        description: "For the purpose of industry regulation, your details are required.",
        nextBtnTitle: "Register Account",
        Element: <PersonalInfo/>
      },
      {
        title: "Residency Info.",
        heading: "Complete Your Profile!",
        description: "For the purpose of industry regulation, your details are required.",
        nextBtnTitle: "Save & Continue",
        Element: <ResidencyInfo/>
      },
      {
        title: "Bank Verification",
        heading: "Complete Your Profile!",
        description: "For the purpose of industry regulation, your details are required.",
        nextBtnTitle: "Save & Continue",
        Element: <BankVerification/>
      }
    ]
  )
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const onValuesChangeFun = (changedFields: any)=>{
    const fieldName = changedFields[0]?.name[0]
    const value = changedFields[0]?.value
    setFormState((prev)=>{
      return {
        ...prev,
        [fieldName] : value
      }
    })
  }
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log(values);
    
    setLoading(true)
    if(!lastStep){
      setLoading(false)
      next()
    }else{
      const response = await axios.post('/register', formState)
      const data = response.data
      if (data.success) {
        localStorage.setItem('token', data.token)
        setLoading(false)
        navigate('/')
      }else {
        toast.error(`${data.message}`, {
          position: "top-right",
        })
        setLoading(false)
      }
    }

  }

  const {googleLogin} = useAuth()
  

  return (
    <Flex vertical className="signup-cover">
      
      {
        firstStep ? 
          (
            <Flex justify="flex-end" align="center" className="signup-header">
              <Text type="secondary">Already have an account? <Link to="/login"> &nbsp; Sign In</Link></Text>
            </Flex>
          )
          :
          (
            <Flex justify="space-between" align="center" className="signup-header">
              <Button
                type="text"
                icon={<IoChevronBack style={{ marginBottom: "-3px" }}/>}
                onClick={back}
              > Back</Button>
              <Flex vertical justify="end">
                <small style={{ textAlign: "right", color: "rgba(0, 0, 0, 0.45)" }}>STEP { currentStepIndex } / {steps.length-1} </small>
                <Text type="secondary">{step.title}</Text>
              </Flex>
            </Flex>
          )
      }
      <Row className="p-2">
        <Col 
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 16, offset: 4 }}
          md={{ span: 16, offset: 3 }}
          lg={{ span: 14, offset: 4 }}
        >
          <Title style={{ fontSize: "1.9rem" }} >{step.heading}</Title>
          <Text style={{ fontSize: "1rem", color: "rgba(0, 0, 0, 0.50)" }} >{step.description}</Text>
        </Col>
        <Col 
           xs={{ span: 24, offset: 0 }}
           sm={{ span: 16, offset: 4 }}
           md={{ span: 16, offset: 3 }}
           lg={{ span: 14, offset: 4 }}
        >
          <Form
            initialValues={{ code: "+92", country: "Pakistan" }}
            name="signup"
            onFinish={onFinish}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            
            onFieldsChange={onValuesChangeFun}
            className="py-2"
          >
            {step.Element}
            {
              !firstStep ?
              (
                <Button 
                type="primary" 
                size="large"
                block
                htmlType="submit"
                loading={loading}
                >{step.nextBtnTitle}</Button>
              ): (
                <>
                  <AccountType 
                    title="Individual"
                    description="Personal account to manage all you activities."
                    icon={individual}
                    handler={()=>{
                      setFormState((prev)=>{
                        return {
                          ...prev,
                          user_type : 1
                        }
                      })
                      next()
                    }}
                  />
                  <AccountType 
                    title="Business"
                    description="Own or belong to a company, this is for you."
                    icon={business}
                    handler={()=>{
                      setFormState((prev)=>{
                        return {
                          ...prev,
                          user_type : 2
                        }
                      })
                      next()
                    }}
                  />
                </>
              )
            }

            { 
              !firstStep ? 
                currentStepIndex === 1 ? 
                (<>
                  <Divider> Or </Divider>
                  <Form.Item>
                    <Button 
                      onClick={()=>{
                        googleLogin()
                      }}
                      type="default" 
                      icon={<FcGoogle/>}
                      block
                      size="large"
                      
                    >
                      Signin with Google
                    </Button>
                  </Form.Item>
                </>) 
                : (<Flex className="p-1" justify="center" align="center">
                    <FcLock/>
                    <Text>Your Info is safely secured</Text>
                  </Flex>)
              : ""

            }
          </Form>
        </Col>
      </Row>
    </Flex>
  )
}

export default Signup