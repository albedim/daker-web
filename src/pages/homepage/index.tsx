import { useEffect, useRef, useState } from "react"
import { BASE_URL, getData, getNationalities } from "../../utils/api";
import User, { UserSchema } from "../../interfaces/user";
import Select from "../../components/input/select";
import CursorFollowDiv from "../../components/mouse";
import UserComponent from "../../components/user";
import { FiCopy, FiGithub } from "react-icons/fi";
import { LuLink2 } from 'react-icons/lu'
import 'react18-json-view/src/style.css'
import { MdDone } from "react-icons/md";
import JsonView from "react18-json-view";
import Footer from "../../components/footer";

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
  const [finalUrl, setFinalUrl] = useState(BASE_URL)
  const [visualizeMode, setVisualizeMode] = useState<"json" | "card">("card")
  const [copied, setCopied] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    assignData(finalUrl)
    assignNationalities()
  },[])

  useEffect(() => {
    let url = BASE_URL;
    Object.entries(options).forEach((entry) => {
      if (entry[1] != "") {
        if (url == BASE_URL) {
          url += "?" + entry[0] + "=" + entry[1]
        } else {
          url += "&" + entry[0] + "=" + entry[1]
        }
      }
    })
    setFinalUrl(url)
    assignData(url)
  },[options])

  const assignData = async (url_: string) => {
    setIsLoaded(false)
    const data_: User = await getData(url_);
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
      <div className="p-8 h-screen items-center justify-around flex">
        <div>
          <h1 className="font-bold font-[Raleway] text-4xl" >Daker, JSON fake users data<br />for prototype testing</h1>
          <h2 className="mt-3 font-semibold font-[Raleway] mt-2 text-[gray] text-xl" >
            Just a <span className="text-[orange] underline">REST API</span> able to generate millions of different fake users
            <br />using a dataset containing more than 10 Millions fake users data.<br />
            Click the button and test the API using our GUI.
            </h2>
          <div className="mt-4 flex">
            <div className="pr-2 pt-8 items-center justify-around flex">
              <button onClick={() => usersRef.current.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[orange] 
              items-center flex
              border-[orange] border-2 font-medium text-[white] sfont-semibold font-[Raleway] 
              transition hover:bg-[transparent] border-[orange] hover:border-2 rounded-lg pr-7 pl-7 bg-[orange] p-4" >
                <LuLink2 className="mr-2"/>
                Test the API
              </button>
            </div>
            <div className="pt-8 items-center justify-around flex">
              <a href="https://github.com/albedim/daker">
                <button className="items-center flex hover:text-[white] hover:bg-[orange] border-2 font-semibold font-[Raleway] 
                transition border-[orange] text-[orange] rounded-lg pr-7 pl-7 p-4" >
                  <FiGithub className="mr-2"/>
                  Repository
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div ref={usersRef} className="h-screen items-center justify-around flex">
        <div className="p-8">
          <div>
            <h2 className="font-bold font-[Raleway] text-center text-3xl" >Generate fake users data and personalize it</h2>
            <p className="mt-2 text-[gray] font-semibold font-[Raleway] text-lg">
              The users generated are totally fake but very realistic, example: <span className="underline italic">if you set 'nationality'<br />
              to 'russian' then, (name, surname, phone number and address) are going to be russian</span>
              <br />20 Users are going to be generated but only the first one is going to be showed</p>
          </div>
          <div className="justify-between mt-14 flex">
            <div className="flex flex-wrap">
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
              <div className="items-center ml-4 flex">
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
            </div>
            <div className="ml-8 pt-5 items-center flex">
              <button onClick={() =>  setOptions({
                sex: "",
                age: "",
                max_age: "",
                min_age: "",
                nationality: ""
              })} className="text-[white] transition hover:bg-opacity-80 rounded-lg pr-4 pl-4 bg-[orange] p-3" >Reset</button>
            </div>
          </div>
          <div className="mt-3 items-center flex p-3 bg-opacity-10 bg-[orange] rounded-md border">
            <LuLink2 className="mr-2"/>
            <a className="underline font-Raleway" href={finalUrl.replace("/one", "")}>{finalUrl.replace("/one", "")}</a>
          </div>
          <div className="mt-6">
            <Select
              value={visualizeMode}
              disabled={false}
              className="rounded-lg cursor-pointer border-[orange] border-2 pr-4 pl-4 p-2 bg-[transparent]" 
              onChange={(e) => setVisualizeMode(e.target.value)} 
              name="visualize_mode" 
              id="visualize_mode"
            >
              <option value="card">Card</option>
              <option value="json">JSON</option>
            </Select>
          </div>
          <div className="mt-3">
            {visualizeMode == 'card' ? (
              <UserComponent loading={!isLoaded} data={data} />
            ):(
              visualizeMode == 'json' ? (
                <div className="justify-between flex p-3 bg-opacity-10 bg-[orange] rounded-md border">
                  <div>
                    <JsonView enableClipboard={false} src={{ ...data, image: data.image.substring(0,34) + "..." }} />
                  </div>
                  <div>
                    {copied ? (
                      <MdDone size={24}/>
                    ):(
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(data))
                          setCopied(true)
                          setTimeout(() => {
                              setCopied(false)
                          }, 2000)
                        }}>
                        <FiCopy size={24}/>
                      </button>
                    )}
                  </div>
                </div>
              ):(
                <></>
              )
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage