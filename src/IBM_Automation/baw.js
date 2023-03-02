import React, { useState, useEffect } from "react";
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
  TableExpandedRow,
  TableExpandRow,
  TableHeader,
  TableBody,
  TableCell,
  TableSelectRow,
} from "@carbon/react";
import { Button } from "@carbon/react";
import { CodeSnippet } from "@carbon/react";

import "../scss/_discover.scss";
import { Password } from "@carbon/icons-react";

const blockClass = `full-page-example`;

export const BAW = () => {
  const [simulatedDelay] = useState(750);
  const [shouldReject, setShouldReject] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [connection, setConnection] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [topicDescriptionValue, setTopicDescriptionValue] = useState("");
  const [topicVersionValue, setTopicVersionValue] = useState("");
  const [stepTwoTextInputValue, setStepTwoTextInputValue] = useState(1);
  const [stepThreeTextInputValue, setStepThreeTextInputValue] =
    useState("one-day");
  const [isInvalid, setIsInvalid] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [opRowData, setOpRowData] = useState([]);
  const [url, setUrl] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState("");
  var fileData = "";
  const clearCreateData = () => {
    setUsername("");
    setPassword("");
    setConnection("");
    setTopicDescriptionValue("");
    setTopicVersionValue("");
    setStepTwoTextInputValue(1);
    setStepThreeTextInputValue("one-day");
    setHasSubmitError(false);
    setIsInvalid(false);
    setShowCode(false);
    setCode("");
  };
  useEffect(() => {
    fetch(
      "https://recruitement-fsw-https-recruitment.cp4ba-mission-16bf47a9dc965a843455de9f2aef2035-0000.eu-de.containers.appdomain.cloud/common-assets"
    )
      .then((response) => response.json())
      .then((data) => {
        setRowData(data.common_assets);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const specdata = ` {
    "build": "lerna run build --stream --prefix --npm-client yarn",\n"ci-check": "carbon-cli ci-check",\n"clean": "lerna run clean && lerna clean --yes && rimraf node_modules",
    "doctoc": "doctoc --title '## Table of Contents'","format": "prettier --write '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**'",
    "format:diff": "prettier --list-different '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**' '!packages/components/**'",
    "lint": "eslint actions config codemods packages","lint:styles": "stylelint '**/*.{css,scss}' --report-needless-disables --report-invalid-scope-disables",
    "sync": "carbon-cli sync","test": "cross-env BABEL_ENV=test jest","test:e2e": "cross-env BABEL_ENV=test jest --testPathPattern=e2e --testPathIgnorePatterns='examples,/packages/components/,/packages/react/'"
  },"resolutions": {"react": "~16.9.0","react-dom": "~16.9.0","react-is": "~16.9.0","react-test-renderer": "~16.9.0"
  }
  `;
  function getFullDetails(row) {
    setShowCode(false);
    fetch(
      "https://recruitement-fsw-https-recruitment.cp4ba-mission-16bf47a9dc965a843455de9f2aef2035-0000.eu-de.containers.appdomain.cloud/detail?id=" +
        row.id
    )
      .then((response) => response.json())
      .then((data) => {
        let opData = [];
        data.common_assets.map((allData) => {
          let name = allData.name;
          let sub_type = allData.sub_type;
          let id = allData.id;
          let project_name = allData?.origin?.snapshot?.project_name;
          let version = allData?.version;
          let description = allData?.description;

          allData.operations.map((operations) => {
            opData.push({
              id: id,
              name: name,
              sub_type: sub_type,
              op_name: operations.op_name,
              op_parms: operations.op_parms,
              project_name: project_name,
              version: version,
              description: description,
            });
          });
        });
        var testData = [];
        testData.push(opData[0]);
        setOpRowData(testData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  var button = document.getElementsByClassName("bx--btn bx--btn--secondary")[0];
  button?.addEventListener("click", () => {
    setShowCode(false);
  });
  const headerData = [
    {
      key: "type",
      header: "Type",
    },
    {
      key: "name",
      header: "Name",
    },
    {
      key: "version",
      header: "Version",
    },
    {
      key: "sub_type",
      header: "SubType",
    },
  ];
  const headerOp = [
    {
      key: "op_name",
      header: "Operation",
    },
    {
      key: "version",
      header: "version",
    },
    {
      key: "description",
      header: "Description",
    },
  ];
  const openSpecDetails = (row, i) => {
    setUrl(
      `http://127.0.0.1:8081/openapi?project_name=${opRowData[i].project_name}&name=${opRowData[i].name}`
    );
    fetch(
      `http://127.0.0.1:8081/openapi?project_name=${opRowData[i].project_name}&name=${opRowData[i].name}`
    )
      .then((response) => response.json())
      .then((data) => {
        const codeSnippet = `${JSON.stringify(data)}`;

        setCode(codeSnippet);
        setShowCode(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function exportUserInfo() {
    const fileData = JSON.stringify(code);
    const blob = new Blob([fileData], { type: "text/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "open-api.json";
    link.href = url;
    link.click();
  }
  return (
    <>
      <CreateFullPage
        className={blockClass}
        submitButtonText="Train"
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
          title="Connection"
          subtitle="This page reads the connection details to BAW"
          description="It uses the username and password for connection and connection string is used to generate open api spec."
          fieldsetLegendText="Topic name"
          onNext={() => {
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
          disableSubmit={!userName || !password || !connection}
        >
          <Row>
            <Column xlg={5} lg={5} md={4} sm={4}>
              <TextInput
                labelText="Username"
                id="tearsheet-multi-step-story-text-input-multi-step-1"
                value={userName}
                placeholder="Enter user name"
                onChange={(event) => {
                  if (event.target.value.length) {
                    setIsInvalid(false);
                  }
                  setUsername(event.target.value);
                }}
                invalid={isInvalid}
                invalidText="This is a required field"
                onBlur={() => {
                  if (!userName.length) {
                    setIsInvalid(true);
                  }
                }}
              />
              <TextInput.PasswordInput
                labelText="Password"
                id="tearsheet-multi-step-story-text-input-multi-step-1"
                value={password}
                placeholder="Enter password"
                onChange={(event) => {
                  if (event.target.value.length) {
                    setIsInvalid(false);
                  }
                  setPassword(event.target.value);
                }}
                invalid={isInvalid}
                invalidText="This is a required field"
                onBlur={() => {
                  if (!password.length) {
                    setIsInvalid(true);
                  }
                }}
              />
              <TextInput
                labelText="Connection string"
                id="tearsheet-multi-step-story-text-input-multi-step-1"
                value={connection}
                placeholder="Enter connection string"
                onChange={(event) => {
                  if (event.target.value.length) {
                    setIsInvalid(false);
                  }
                  setConnection(event.target.value);
                }}
                invalid={isInvalid}
                invalidText="This is a required field"
                onBlur={() => {
                  if (!connection.length) {
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
          title="Exposed Automation Service"
          subtitle="List of Exposed APIs."
          description="This section display the type,name,version and sub type of exposed api service."
          fieldsetLegendText="Partitions"
        >
          <Row>
            <Column xlg={3} lg={3} md={3} sm={3}>
              <DataTable rows={rowData} headers={headerData} radio>
                {({
                  rows,
                  headers,
                  getHeaderProps,
                  getTableProps,
                  getRowProps,
                  getSelectionProps,
                }) => (
                  <TableContainer title="Exposed">
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
                          <>
                            <TableRow key={i} {...getRowProps({ row })}>
                              <TableSelectRow
                                {...getSelectionProps({ row })}
                                onSelect={(evt) => {
                                  getFullDetails(row);
                                  getSelectionProps({ row }).onSelect(evt);
                                }}
                              />
                              {row.cells.map((cell) => (
                                <TableCell key={cell.id}>
                                  {cell.value}
                                </TableCell>
                              ))}
                            </TableRow>
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </DataTable>
            </Column>
          </Row>
        </CreateFullPageStep>
        <CreateFullPageStep
          className={`${blockClass}__step-fieldset--no-label`}
          title="Open API"
          subtitle="List of apis and its operational details."
          description="If you want to get open api spec url just click on OpenAPI URL in the table."
          fieldsetLegendText="Message retention"
          disableSubmit={!stepThreeTextInputValue}
          onNext={() => Promise.resolve()}
          onRequestSubmit={() => {
            setShowCode(false);
          }}
        >
          <DataTable rows={opRowData} headers={headerOp}>
            {({
              rows,
              headers,
              getHeaderProps,
              getTableProps,
              getRowProps,
              getTableContainerProps,
            }) => (
              <TableContainer
                title="Get Spec details"
                {...getTableContainerProps()}
              >
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      <TableRow></TableRow>
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                      <TableHeader></TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, i) => (
                      <>
                        <React.Fragment key={i + row.id}>
                          <TableExpandRow {...getRowProps({ row })}>
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id}>{cell.value}</TableCell>
                            ))}
                             <TableCell>
                            <Button
                            style={{"margin-right":"5px"}}
                              kind="tertiary"
                              size="sm"
                              onClick={(e) => openSpecDetails(row, i)}
                            >
                              View File
                            </Button>
                            <Button
                             size="sm"
                              kind="tertiary"
                              onClick={() => {
                                exportUserInfo();
                              }}
                            >
                              Download
                            </Button></TableCell>
                          </TableExpandRow>
                          <TableExpandedRow
                            colSpan={headers.length + 3}
                            className="demo-expanded-td"
                          >
                            <h6>Parameter details</h6>
                            {opRowData[0]?.op_parms.map((op, i) => (
                              <>
                                <p>
                                  {op.parm_name} : {op.parm_type}
                                </p>
                              </>
                            ))}
                          </TableExpandedRow>
                        </React.Fragment>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>
        </CreateFullPageStep>

        {showCode && (
          <div>
            <CodeSnippet type="multi">
              <p style={{ whiteSpace: "pre-line" }}>{code}</p>
            </CodeSnippet>
          </div>
        )}
      </CreateFullPage>

      <div>
        <Modal
          modalHeading="OpenAPI URL"
          open={showModal}
          onRequestClose={(e) => setShowModal(false)}
          passiveModal
        >
          <p> </p>
        </Modal>
      </div>
    </>
  );
};
