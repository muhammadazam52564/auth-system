import { Form, Input, Select } from "antd"
import { countriesLabels, countriesLabelswithFlagCode } from "../../../../Config/constants"

const ResidencyInfo = () => {
  return (
    <>
    <Form.Item
      label="Phone number"
      name="phone"
      rules={[
        { required: true, message: 'Please input your Phone number!' },
        { min: 10, message: 'Please input 10 digit Phone number!' }
      ]}
    >
        <Input  
            size="large"  
            addonBefore={
              <Form.Item
                style={{ margin: 0 }}
                name="code"
                
              >
                <Select 
                  style={{ width: 120 }}
                  size="large"  
                  defaultValue=""
                  options={countriesLabelswithFlagCode}>
                  
                </Select>
              </Form.Item>
            }  
            placeholder="1234567890"/>
          
    </Form.Item>

    <Form.Item
      label="Your address"
      name="address"
      rules={[
        { required: true,  message: 'Please input your address!' }
      ]}
    >
      <Input  size="large"   placeholder="lahore Punjab Pakistan"/>
    </Form.Item>

    <Form.Item
      label="Country of residence"
      name="country"
      rules={[
        { required: true, message: 'Please select your country!' },
      ]}
    >
      <Select 
        placeholder="Select Country of resedence" 
        defaultValue="Pakistan"
        size="large"
        options={countriesLabels}
      ></Select>
    </Form.Item>
    </>
  )
}

export default ResidencyInfo