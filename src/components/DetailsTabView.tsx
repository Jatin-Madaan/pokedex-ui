import {useState} from "react";

const DetailsTabView = ({formsData, capitalize, id}: any) => {
    const [activeTab, setActiveTab] = useState("evolution");
    const [activeForm, setActiveForm] = useState(0);
    const [description, setDescription] = useState(formsData[0]);

    return (
        <div className="tab-container">
            <div className="tabs text-2xl font-medium">
                <div className={`tab ${activeTab === "evolution" ? "active" : ""}`}
                     onClick={() => setActiveTab("evolution")}> Evolution
                </div>
                <div className={`tab ${activeTab === "detail" ? "active" : ""}`}
                     onClick={() => setActiveTab("detail")}> Detail
                </div>
                <div className={`tab ${activeTab === "abilities" ? "active" : ""}`}
                     onClick={() => setActiveTab("abilities")}> Abilities
                </div>
            </div>
            <div style={{marginTop: "5%"}}>
                {activeTab === "evolution" && (
                    <div>
                        <div className="forms-container">
                            {formsData.map((form: any, index: any) => (
                                <div
                                    key={form.id}
                                    className={`form ${activeForm === index ? "active" : ""}`}
                                    onClick={() => {
                                        setActiveForm(index);
                                        setDescription(form);
                                    }}
                                >
                                    <img src={form.url} alt={form.currentSpecies}/>
                                </div>
                            ))}
                        </div>
                        {
                            description && (
                                <div className="details">
                                    <h2 className="text-2xl mb-3 font-bold text-theme-colour-text-dark">{capitalize(description.currentSpecies)}</h2>
                                    <p className="text-xl font-medium text-theme-colour-text-light">{description.description}</p>
                                </div>
                            )
                        }

                    </div>
                )}

                {activeTab === "detail" && (
                    <div className="content w-full bg-theme-colour-violet text-theme-colour-gray
                     rounded-2xl flex flex-col justify-center p-28 font-bold text-2xl shadow-lg">
                        {
                            formsData.map((form: any, index: any) => (
                                 id == form?.id && (
                                     <div key={index}>
                                            <div className="details-parent">
                                                <div>Height</div>
                                                <div>{form?.height}</div>
                                            </div>
                                            <div className="details-parent">
                                                <div>Weight</div>
                                                <div>{form?.weight}</div>
                                            </div>
                                            <div className="details-parent">
                                                <div>Color</div>
                                                <div style={{
                                                    backgroundColor: `${form?.colour}`,
                                                    height: "2rem",
                                                    width: "4rem"
                                                }}></div>
                                            </div>
                                            <div className="details-parent">
                                                <div>Experience</div>
                                                <div>{form.baseExperience}</div>
                                            </div>
                                        </div>

                                )
                            ))
                        }
                    </div>

                )}
                {activeTab === "abilities" && (
                    <div className="content w-full bg-theme-colour-violet items-center text-theme-colour-gray
                     rounded-2xl flex flex-col justify-center p-28 font-bold text-3xl shadow-lg">
                        {
                            formsData.map((form: any, index: any) => (
                                form?.id == id && (
                                    <div key={index}>
                                        {
                                            form?.abilities?.map((ability: any, index: any) => (
                                                <div className="details-parent" key={index}>
                                                    <div>{index + 1}. {capitalize(ability)}</div>
                                                </div>
                                            ))
                                        }

                                    </div>

                                )
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetailsTabView;