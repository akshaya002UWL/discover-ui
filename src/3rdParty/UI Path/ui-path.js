import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  InlineNotification,
  RadioButtonGroup,
  RadioButton,
  TextInput,
  Toggle,
  NumberInput,
  Row,
  Modal,
  Column,
} from "carbon-components-react";
import { CreateFullPage, CreateFullPageStep } from "@carbon/ibm-products";
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableSelectRow,
} from "@carbon/react";
import { StructuredListWrapper, StructuredListHead, StructuredListRow, StructuredListCell, StructuredListBody } from '@carbon/react';

import { Button } from "@carbon/react";
import { CodeSnippet } from "@carbon/react";
import "../../scss/_discover.scss";

const blockClass = `full-page-example`;

export const UIPath = () => {
  const [simulatedDelay] = useState(750);
  const [shouldReject, setShouldReject] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [clientID, setClientID] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [access_token, setToken] = useState("");
  const [folderDetails, setFolderDetails] = useState([]);
  const [release, setRelease] = useState([]);
  const [process, setProcess] = useState([]);
  const [folder_id, setFolder_id] = useState([]);

  const [stepThreeTextInputValue, setStepThreeTextInputValue] =
    useState("one-day");
  const [isInvalid, setIsInvalid] = useState(false);


  const url = ''
  const base_url = `http://127.0.0.1:8081/`;


  const clearCreateData = () => {
    setClientID("");
    setRefreshToken("");
    setTopicDescriptionValue("");
    setTopicVersionValue("");
    setStepTwoTextInputValue(1);
    setStepThreeTextInputValue("one-day");
    setHasSubmitError(false);
    setIsInvalid(false);
    setToken("");
    setGrantType("");
    setRefreshToken("");
    setClientID("");
  };

  const folderHeader = [
    {
      key: "DisplayName",
      header: "DisplayName",
    },
    {
      key: "ProvisionType",
      header: "ProvisionType",
    },
    {
      key: "Description",
      header: "Description",
    },
    {
      key: "PermissionModel",
      header: "SubType",
    },
  ];

  const releaseHeader = [
    {
      key: "Name",
      header: "Name",
    },
    {
      key: "Description",
      header: "Description",
    }
  ];
 
  function folders() {
    const url = base_url+"/folders"

     fetch(url, {
       method: 'get',
       headers: {
      "Content-Type": "application/json",
      "Authorization":access_token
    }
      }).then((response) => response.json())
       .then((data) => {
       
        data?.value?.map((folder) => {
          folder.id = folder.Id
        });
       setFolderDetails(data.value);
       })
       .catch((err) => {
         console.log(err.message);
       });
   }
   function authenticate() {
    const url = base_url+"auth"
 
     const payload = {
       client_id: clientID,
       refresh_token: refreshToken
     }
     fetch(url, {
       method: 'post',
       body: JSON.stringify(payload),
       headers: {
      "Content-Type": "application/json",
      },
      }).then((response) => response.json())
       .then((data) => {
        if(data?.error){
          console.log(data);
        }else{
          setToken(data.access_token);
console.log('token added');
        }

       })
       .catch((err) => {

         console.log(err.message);
       });
   }
   function releases(data) {
    const url = base_url+"/Releases?release="+data.id
    setFolder_id(data.id)
     fetch(url, {
       method: 'get',
       headers: {
        "Content-Type": "application/json",
        "Authorization":access_token
      }
      }).then((response) => response.json())
       .then((data) => {
        data?.value.map((folder) => {
          folder.id = folder.Id
        });
       setRelease(data.value)
       })
       .catch((err) => {
         console.log(err.message);
       });
   }
   function startProcess(row) {
    const url = base_url+"/StartProcess"
    const rkey = release.find(x => x.Id == row.id);
     fetch(url, {
       method: 'post',
       body:JSON.stringify({
        folder_id:String(folder_id),
        key:rkey.Key
       }),
       headers: {
        "Content-Type": "application/json",
        "Authorization":access_token
      }
      }).then((response) => response.json())
       .then((data) => {
       console.log(data);
        data?.value.map((folder) => {
          folder.id = folder.Id
        });
       setProcess(data.value);
       setShowModal(true)
       })
       .catch((err) => {
        console.log(err);
        setHasSubmitError(true);
       });
   }
  return (
    <>
      <CreateFullPage
        className={blockClass}
        submitButtonText="Create"
        cancelButtonText="Cancel"
        backButtonText="Back"
        nextButtonText="Next"
        title="Create topic"
        modalDangerButtonText="Cancel partition"
        modalSecondaryButtonText="Return to form"
        modalTitle="Are you sure you want to cancel?"
        modalDescription="If you cancel, the information you have entered won't be saved."
        onClose={clearCreateData}
        onRequestSubmit={() =>
          new Promise((resolve) => {
            setTimeout(() => {
              clearCreateData();
              resolve();
            }, simulatedDelay);
          })
        }
      >
        <CreateFullPageStep
          className={`${blockClass}__step-fieldset--no-label`}
          title="Authentication"
          subtitle="This page reads the connection details to UIPath"
          description="It uses the grant type , client id and refresh token for authentication."
          fieldsetLegendText="Topic name"
          onNext={async () => {
            if (!access_token?.length) {
               await authenticate();
            }
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                // Example usage of how to prevent the next step if some kind
                // of error occurred during the `onNext` handler.
                if (shouldReject) {
                  setHasSubmitError(true);
                  reject("Simulated error");
                }

                setIsInvalid(false);
                resolve();
              }, simulatedDelay);
            });
          }}
          disableSubmit={!clientID || !refreshToken }
        >
          <Row>
            <Column xlg={5} lg={5} md={4} sm={4}>
              {/* <TextInput
                labelText="Grant Type"
                id="tearsheet-multi-step-story-text-input-multi-step-1"
                value={grantType}
                placeholder="Enter grant type"
                onChange={(event) => {
                  if (event.target.value.length) {
                    setIsInvalid(false);
                  }
                  setGrantType(event.target.value);
                }}
                invalid={isInvalid}
                invalidText="This is a required field"
                onBlur={() => {
                  if (!grantType.length) {
                    setIsInvalid(true);
                  }
                }}
              /> */}
              <TextInput
                labelText="Client id"
                id="tearsheet-multi-step-story-text-input-multi-step-1"
                value={clientID}
                placeholder="Enter client id"
                onChange={(event) => {
                  if (event.target.value.length) {
                    setIsInvalid(false);
                  }
                  setClientID(event.target.value);
                }}
                invalid={isInvalid}
                invalidText="This is a required field"
                onBlur={() => {
                  if (!clientID.length) {
                    setIsInvalid(true);
                  }
                }}
              />
              <TextInput
                labelText="Refresh Token"
                id="tearsheet-multi-step-story-text-input-multi-step-1"
                value={refreshToken}
                placeholder="Enter refresh token"
                onChange={(event) => {
                  if (event.target.value.length) {
                    setIsInvalid(false);
                  }
                  setRefreshToken(event.target.value);
                }}
                invalid={isInvalid}
                invalidText="This is a required field"
                onBlur={() => {
                  if (!refreshToken.length) {
                    setIsInvalid(true);
                  }
                }}
              />
              {hasSubmitError && (
                <InlineNotification
                  lowContrast
                  kind="error"
                  title="Error"
                  subtitle="Resolve errors to continue"
                  onClose={() => setHasSubmitError(false)}
                />
              )}
            </Column>
          </Row>
        </CreateFullPageStep>
        <CreateFullPageStep
          className={`${blockClass}__step-fieldset--no-label`}
          title="Folder Service"
          subtitle="List of Folders."
          description="This section display the details of folders."
          fieldsetLegendText="FolderDetails"
          onMount={async ()=>{
            console.log('call');
            if(access_token?.length){
              let folder = await folders();
             }
          }}
        >
          <Row>
            <Column xlg={3} lg={3} md={3} sm={3}>
                <DataTable rows={folderDetails} headers={folderHeader} radio>
                  {({
                    rows,
                    headers,
                    getHeaderProps,
                    getTableProps,
                    getRowProps,
                    getSelectionProps,
                  }) => (
                    <TableContainer title="Folder Details">
                      <Table {...getTableProps()}>
                        <TableHead>
                          <TableRow>
                            <TableHeader></TableHeader>
                            {headers.map((header) => (
                              <TableHeader {...getHeaderProps({ header })}>
                                {header.header}
                              </TableHeader>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row, i) => (
                            <TableRow key={i} {...getRowProps({ row })}>
                              <TableSelectRow
                                {...getSelectionProps({ row })}
                                onSelect={(evt) => {
                                  releases(row);
                                  getSelectionProps({ row }).onSelect(evt);
                                }}
                              />
                              {row.cells.map((cell) => (
                                <TableCell key={cell.id}>
                                  {cell.value}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </DataTable>
              {/* )} */}
            </Column>
          </Row>
        </CreateFullPageStep>
        <CreateFullPageStep
          className={`${blockClass}__step-fieldset--no-label`}
          title="Release details"
          subtitle="By selecting any release the bot will start fetching the open api spec details."
          description=""
          fieldsetLegendText="Message retention"
          disableSubmit={!stepThreeTextInputValue}
          onMount={()=>{console.log("sss");}}
          onNext={() => Promise.resolve()}
        >
                         <DataTable rows={release} headers={releaseHeader} radio>
                  {({
                    rows,
                    headers,
                    getHeaderProps,
                    getTableProps,
                    getRowProps,
                    getSelectionProps,
                  }) => (
                    <TableContainer title="Release Details">
                      <Table {...getTableProps()}>
                        <TableHead>
                          <TableRow>
                            <TableHeader></TableHeader>
                            {headers.map((header) => (
                              <TableHeader {...getHeaderProps({ header })}>
                                {header.header}
                              </TableHeader>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row, i) => (
                            <TableRow key={i} {...getRowProps({ row })}>
                              <TableSelectRow
                                {...getSelectionProps({ row })}
                                onSelect={(evt) => {
                                  startProcess(row);
                                  getSelectionProps({ row }).onSelect(evt);
                                }}
                              />
                              {row.cells.map((cell) => (
                                <TableCell key={cell.id}>
                                  {cell.value}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </DataTable>
        </CreateFullPageStep>
      </CreateFullPage>
      <div>
        <Modal
          modalHeading="Process Details"
          open={showModal}
          onRequestClose={(e) => setShowModal(false)}
          passiveModal
        >
          <p>
          <StructuredListWrapper ariaLabel="Structured list">
      <StructuredListHead>
        <StructuredListRow
          head
          tabIndex={0}
        >
          <StructuredListCell head>
            Process 
          </StructuredListCell>
          <StructuredListCell head>
            Status 
          </StructuredListCell>
        </StructuredListRow>
      </StructuredListHead>
      <StructuredListBody>
        

        {process.map((row, i) => (
                      <StructuredListRow>
                         {process.map((row, i) => (<>
                          <StructuredListCell>{row.ReleaseName}</StructuredListCell>

                          <StructuredListCell>{row.State}</StructuredListCell>
                          </>
                          ))}
                       
                    </StructuredListRow>    
                        ))}
      </StructuredListBody>
    </StructuredListWrapper>
          </p>
        </Modal>
      </div>
    </>
  );
};
