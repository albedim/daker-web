import { useEffect, useRef, useState } from "react"
import { BASE_URL, getData, getNationalities } from "../../utils/api";
import User, { UserSchema } from "../../interfaces/user";
import Select from "../../components/input/select";
import CursorFollowDiv from "../../components/mouse";
import { FiCopy, FiGithub } from "react-icons/fi";
import { LuLink2 } from 'react-icons/lu'
import 'react18-json-view/src/style.css'
import { MdDone } from "react-icons/md";
import './index.css'
import JsonView from "react18-json-view";
import Footer from "../../components/footer";
import Explainer from "../../components/Explainer";

const HomePage = () => {

  const [data, setData] = useState<User>(UserSchema);
  const [isMobile, setIsMobile] = useState(window.screen.width < 720)
  const [nationalities, setNationalities] = useState<string[]>([])
  const [options, setOptions] = useState({
    sex: "",
    age: "",
    max_age: "",
    min_age: "",
    nationality: ""
  })
  const [finalUrl, setFinalUrl] = useState(BASE_URL)

  useEffect(() => {
    assignData(finalUrl)
    assignNationalities()
  },[])

  const assignData = async (url_: string) => {
    const data_: User = await getData(url_);
    console.log(data_)
    if (data_ !== undefined) {
      setData(data_);
    }
  }

  const assignNationalities = async () => {
    const nationalities = await getNationalities()
    setNationalities(nationalities)
  }

  const handleOptions = (e: any) => {
    if (e.target.name == 'max_age') {
      let newFinalUrl = finalUrl
      if (finalUrl.includes("max_age")) {
        newFinalUrl = finalUrl.split("&")[0]
      }
      setOptions({ ...options, max_age: e.target.value })
      setFinalUrl(newFinalUrl + "&" + e.target.name + "=" + e.target.value)
      assignData(newFinalUrl + "&" + e.target.name + "=" + e.target.value)
      return
    }
    const newOptions: any = { ...options }
    newOptions[e.target.name] = e.target.value
    setOptions(newOptions)
    if (e.target.value == "") {
      setFinalUrl(BASE_URL)
      assignData(BASE_URL)
    } else {
      setFinalUrl(BASE_URL + "?" + e.target.name + "=" + e.target.value)
      assignData(BASE_URL + "?" + e.target.name + "=" + e.target.value)
    }
  }

  return (
    <>
      <div className="p-14 justify-around flex bg-[#fafafa] h-full w-screen">
        <div>
          <div className="" style={{ maxWidth: isMobile ? 324 : 1024 }}>
            <div className="justify-around flex">
              <div className="w-js flex p-4 bg-[white] rounded-md border">
                <JsonView className="text-sm" enableClipboard={false} src={{ ...data, image: data.image.substring(0,34) + "..." }} />
              </div>
            </div>
            <div className="pt-8 text-center justify-around flex">
              <div className="">
                <h1 className="text-2xl font-semibold font-[Raleway]">Daker API</h1>
                <h2 className="text-sm font-normal font-[Raleway]">Fake user-data generator</h2>
              </div>
            </div>
            <div className="pt-4 justify-around flex">
              <div className="flex">
                <a target="__blank" href="https://github.com/albedim/daker">
                  <button className="transition-all hover:bg-opacity-10 hover:bg-[gray] pr-2 items-center p-1 text-[orange] rounded-md border flex">
                    <FiGithub className="mr-2"/>
                    <p className="text-sm font-normal font-[Raleway]">Github</p>
                  </button>
                </a>
                <a target="__blank" href={BASE_URL}>
                  <button className="transition-all hover:bg-opacity-10 hover:bg-[gray] ml-2 pr-2 items-center p-1 text-[orange] rounded-md border flex">
                    <LuLink2 className="mr-2"/>
                    <p className="text-sm font-normal font-[Raleway]">API</p>
                  </button>
                </a>
              </div>
            </div>
            <div className="h-16"></div>
            <Explainer 
              description="This endpoint returns multiple results, 20 by default" 
              showDescription
              value={
                <a title={BASE_URL.replace("/one", "")} target="__blank" href={finalUrl} className="font-[Raleway]">
                  <p>
                    <span style={{ fontFamily: 'Source Code Pro' }} className="font-bold">{"{...}"}</span>
                    /users
                  </p>
                </a>
              }
              title="Base API url"
            />
            <div className="h-24" ></div>
            <Explainer
              description="This endpoint just returns one result" 
              showDescription
              value={
                <a title={BASE_URL} target="__blank" href={finalUrl} className="font-[Raleway]">
                  <p>
                    <span style={{ fontFamily: 'Source Code Pro' }} className="font-bold">{"{...}"}</span>
                    /users/one
                  </p>
                </a>
              } 
              title="Base API url"
            />
            <div className="h-24" ></div>
            <div>
              <Explainer
                description="It returns users having the given nationality" 
                showDescription
                showSelector
                selector={
                  <Select
                    disabled={false} 
                    value={options.nationality} 
                    className="h-10 bg-[white] text-sm mb-2 rounded-md cursor-pointer border pr-4 pl-4 p-1" 
                    onChange={(e) => handleOptions(e)} 
                    name="nationality" 
                    id="nationality">
                    <option value="">Any</option>
                    {nationalities.map(nationality => (
                      <option value={nationality}>{nationality.toUpperCase()}</option>
                    ))}
                  </Select>
                }
                value={
                  <a title={finalUrl} target="__blank" href={finalUrl} className="font-[Raleway]">
                    <p>
                      <span style={{ fontFamily: 'Source Code Pro' }} className="font-bold">{"{...}"}</span>
                        /users/one
                        {finalUrl.includes("=") ? <span className="decoration-[orange] underline">?{finalUrl.split("?")[1]}</span> : null}
                    </p>
                  </a>
                }
                title="Nationality filter"
              />
              <div className="h-8"></div>
              <Explainer
                value={
                  <JsonView 
                    className="text-sm" 
                    enableClipboard={false} 
                    src={{ ...data, image: data.image.substring(0,34) + "..." }} 
                  />
                } 
                title={options.nationality != "" ? 
                  "Only " + options.nationality + " users are shown now" :
                  "Users of all nationalities are shown now"
                }
              />
            </div>
            <div className="h-24"></div>
            <div>
              <Explainer 
                description="It returns users having the given age" 
                showDescription
                showSelector
                selector={
                  <Select
                    disabled={false} 
                    value={options.age} 
                    className="h-10 bg-[white] text-sm mb-2 rounded-md cursor-pointer border pr-4 pl-4 p-1" 
                    onChange={(e) => handleOptions(e)} 
                    name="age" 
                    id="age">
                    <option value="">Any</option>
                    {Array.from({ length: 90 }, (_, index) => index + 10).map(age => (
                      <option value={age.toString()}>{age.toString()}</option>
                    ))}
                  </Select>
                }
                value={
                  <a title={finalUrl} target="__blank" href={finalUrl} className="font-[Raleway]">
                    <p>
                      <span style={{ fontFamily: 'Source Code Pro' }} className="font-bold">{"{...}"}</span>
                        /users/one
                        {finalUrl.includes("=") ? <span className="decoration-[orange] underline">?{finalUrl.split("?")[1]}</span> : null}
                    </p>
                  </a>
                } 
                title="Age filter"
              />
              <div className="h-8"></div>
              <Explainer
                value={ 
                  <JsonView 
                    className="text-sm" 
                    enableClipboard={false} 
                    src={{ ...data, image: data.image.substring(0,34) + "..." }} 
                  />
                } 
                title={options.age ? 
                  "Only users who are " + options.age + " are shown now" :
                  "Users of all ages are shown now"
                }
              />
            </div>
            <div className="h-24"></div>
            <div>
              <Explainer 
                description="It returns users having the given age range, be careful.<br/>If you use min_age & max_age you can't use age." 
                showDescription
                showSelector
                selector={
                  <div className="gap-2 flex">
                    <Select
                      disabled={false} 
                      value={options.min_age} 
                      className="h-10 bg-[white] text-sm mb-2 rounded-md cursor-pointer border pr-4 pl-4 p-1" 
                      onChange={(e) => handleOptions(e)} 
                      name="min_age" 
                      id="min_age">
                      <option value="">Any</option>
                      {Array.from({ length: 90 }, (_, index) => index + 10).map(age => (
                        <option value={age.toString()}>{age.toString()}</option>
                      ))}
                    </Select>
                    <Select
                      disabled={false} 
                      value={options.max_age} 
                      className="h-10 bg-[white] text-sm mb-2 rounded-md cursor-pointer border pr-4 pl-4 p-1" 
                      onChange={(e) => handleOptions(e)} 
                      name="max_age" 
                      id="max_age">
                      <option value="">Any</option>
                      {Array.from({ length: 100 - parseInt(options.min_age)}, (_, index) => index + parseInt(options.min_age)).map(age => (
                        <option value={age.toString()}>{age.toString()}</option>
                      ))}
                    </Select>
                  </div>
                }
                value={
                  <a title={finalUrl} target="__blank" href={finalUrl} className="font-[Raleway]">
                    <p>
                      <span style={{ fontFamily: 'Source Code Pro' }} className="font-bold">{"{...}"}</span>
                        /users/one
                        {finalUrl.includes("=") ? <span className="decoration-[orange] underline">?{finalUrl.split("?")[1]}</span> : null}
                    </p>
                  </a>
                } 
                title="Age filter"
              />
              <div className="h-8"></div>
              <Explainer
                value={ 
                  <JsonView 
                    className="text-sm" 
                    enableClipboard={false} 
                    src={{ ...data, image: data.image.substring(0,34) + "..." }} 
                  />
                } 
                title={options.min_age != "" && options.max_age != "" ?
                  "Only users who are between " + options.min_age + " and " + options.max_age + " are shown now" :
                  options.min_age != "" && options.max_age == "" ? 
                  "Only users who are older than " + options.min_age + " are shown now" : 
                  "Users of all age are shown now"
                }
              />
            </div>
            <div className="h-24"></div>
            <div>
              <Explainer 
                description="It returns users having the given sex" 
                showDescription
                showSelector
                selector={
                  <Select
                    disabled={false} 
                    value={options.sex} 
                    className="h-10 bg-[white] text-sm mb-2 rounded-md cursor-pointer border pr-4 pl-4 p-1" 
                    onChange={(e) => handleOptions(e)} 
                    name="sex" 
                    id="sex">
                    <option value="">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                }
                value={
                  <a title={finalUrl} target="__blank" href={finalUrl} className="font-[Raleway]">
                    <p>
                      <span style={{ fontFamily: 'Source Code Pro' }} className="font-bold">{"{...}"}</span>
                        /users/one
                        {finalUrl.includes("=") ? <span className="decoration-[orange] underline">?{finalUrl.split("?")[1]}</span> : null}
                    </p>
                  </a>
                } 
                title="Sex filter"
              />
              <div className="h-8"></div>
              <Explainer
                value={ 
                  <JsonView 
                    className="text-sm" 
                    enableClipboard={false} 
                    src={{ ...data, image: data.image.substring(0,34) + "..." }} 
                  />
                } 
                title={options.sex != "" ? 
                  "Only " + options.sex + " users who are are shown" : 
                  "Users of all sexes are shown"
                }
              />
            </div>
            <div className="h-24"></div>
            <Explainer
              showDescription
              description="N is the number of results you are going to see, it is set to 20 by default<br/>and its max value is 50"
              value={
                <a title={finalUrl} target="__blank" href={finalUrl} className="font-[Raleway]">
                  <p>
                    <span style={{ fontFamily: 'Source Code Pro' }} className="font-bold">{"{...}"}</span>
                      /users/one
                    <span className="decoration-[orange] underline">?n=45</span>
                  </p>
                </a>
              }
              title={"Limit the results"}
            />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default HomePage