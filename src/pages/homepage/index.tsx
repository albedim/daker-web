import { useEffect, useRef, useState } from "react"
import { getData, getNationalities } from "../../utils/api";
import User, { UserSchema } from "../../interfaces/user";
import Select from "../../components/input/select";
import CursorFollowDiv from "../../components/mouse";
import ReactJson from "react-json-view";
import UserComponent from "../../components/user";

const HomePage = () => {

  const [data, setData] = useState<User>(UserSchema);
  const usersRef = useRef<any>()
  const [nationalities, setNationalities] = useState<string[]>([])
  const [options, setOptions] = useState({
    sex: "",
    age: "",
    max_age: "",
    min_age: "",
    nationality: ""
  })
  const [maxAges, setMaxAges] = useState<number[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    assignData()
    assignNationalities()
  },[])

  const assignData = async () => {
    let url = "";
    Object.entries(options).forEach((entry) => {
      if (entry[1] != "") {
        if (url == "") {
          url += "?" + entry[0] + "=" + entry[1]
        } else {
          url += "&" + entry[0] + "=" + entry[1]
        }
      }
    })
    const data_: User = await getData(url);
    console.log(data_)
    if (data_ !== undefined) {
      setData(data_);
      setIsLoaded(true)
    }
  }

  const assignNationalities = async () => {
    const nationalities = await getNationalities()
    setNationalities(nationalities)
  }

  return (
    <div className="h-screen w-screen">
      <CursorFollowDiv/>
      <div className="h-screen border items-center justify-around flex">
        <div>
          <h1 className="font-semibold font-[Raleway] text-4xl" >Daker, Fake data API <br />for free.</h1>
          <h2 className="font-semibold font-[Raleway] mt-2 text-[gray] text-xl" >Daker has more than 10 Millions of <br />random fake data you can use</h2>
          <div className="pt-8 items-center justify-around flex">
            <button onClick={() => usersRef.current.scrollIntoView({ behavior: 'smooth' })} className="font-semibold font-[Raleway] transition hover:bg-[transparent] border-[orange] hover:border-2 rounded-lg pr-7 pl-7 bg-[orange] p-4" >Use the API</button>
          </div>
        </div>
      </div>
      <div ref={usersRef} className="h-screen items-center justify-around flex">
        <div>
          <h2 className="font-semibold font-[Raleway] text-center text-xl" >Generate fake users data and personalize it</h2>
          <div className="mt-2 flex">
            <div>
              <Select disabled={false} value={options.sex} className="rounded-lg cursor-pointer border-[orange] border-2 pr-4 pl-4 p-2 bg-[transparent]" onChange={(e) => setOptions({...options, sex: e.target.value})} name="sex" id="sex">
                <option value="">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </div>
            <div className="ml-4">
              <Select disabled={false} value={options.nationality} className="rounded-lg cursor-pointer border-[orange] border-2 pr-4 pl-4 p-2 bg-[transparent]" onChange={(e) => setOptions({...options, nationality: e.target.value})} name="nationality" id="nationality">
                <option value="">Any</option>
                {nationalities.map(nationality => (
                  <option value={nationality}>{nationality.toUpperCase()}</option>
                ))}
              </Select>
            </div>
            <div className="ml-4 flex">
              <div>
                <Select
                  value={options.age}
                  className="rounded-lg cursor-pointer border-[orange] border-2 pr-4 pl-4 p-2 bg-[transparent]" 
                  disabled={options.max_age != "" || options.min_age != ""} 
                  onChange={(e) => setOptions({...options, age: e.target.value})} 
                  name="age" 
                  id="age"
                >
                  <option value="">Any</option>
                  {Array.from({ length: 90 }, (_, index) => index + 10).map(age => (
                    <option value={age.toString()}>{age.toString()}</option>
                  ))}
                </Select>
              </div>
              <div className="flex ml-4">
                <div>
                  <Select value={options.min_age} className="rounded-lg cursor-pointer border-[orange] border-2 pr-4 pl-4 p-2 bg-[transparent]" disabled={options.age != ""} onChange={(e) => {
                    return setOptions({ ...options, max_age: "", min_age: e.target.value });
                  }} name="min_age" id="min_age">
                    <option value="">Any</option>
                    {Array.from({ length: 90 }, (_, index) => index + 10).map(age => (
                      <option value={age.toString()}>{age.toString()}</option>
                    ))}
                  </Select>
                </div>
                <div className="ml-4">
                  <Select value={options.max_age} className="rounded-lg cursor-pointer border-[orange] border-2 pr-4 pl-4 p-2 bg-[transparent]" disabled={options.min_age == "" || options.age != ""} onChange={(e) => setOptions({...options, max_age: e.target.value})} name="max_age" id="max_age">
                    <option value="">Any</option>
                    {Array.from({ length: 100 - parseInt(options.min_age)}, (_, index) => index + parseInt(options.min_age)).map(age => (
                      <option value={age.toString()}>{age.toString()}</option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            <div className="items-center flex">
              <button onClick={() =>  setOptions({
                sex: "",
                age: "",
                max_age: "",
                min_age: "",
                nationality: ""
              })} className="transition hover:bg-[transparent] border-[orange] hover:border-2 rounded-lg pr-4 pl-4 bg-[orange] p-3" >Reset</button>
            </div>
          </div>
          <div className="mt-4">
            {
              isLoaded ? (
                <UserComponent data={data} />
              ) : null
            }
            <div>
              <button onClick={() =>  {
                assignData()
              }} className="transition hover:bg-[transparent] border-[orange] hover:border-2 rounded-lg pr-7 pl-7 bg-[orange] p-4" >Generate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage