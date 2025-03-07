import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { useErrorHandler } from "react-error-boundary";
import { InjectedRouter, Params } from "react-router/lib/Router";

import { AppContext } from "context/app";
import { QueryContext } from "context/query";
import { DEFAULT_QUERY } from "utilities/constants";
import configAPI from "services/entities/config";
import queryAPI from "services/entities/queries";
import statusAPI from "services/entities/status";
import {
  IGetQueryResponse,
  ICreateQueryRequestBody,
  ISchedulableQuery,
} from "interfaces/schedulable_query";

import QuerySidePanel from "components/side_panels/QuerySidePanel";
import MainContent from "components/MainContent";
import SidePanelContent from "components/SidePanelContent";
import CustomLink from "components/CustomLink";

import useTeamIdParam from "hooks/useTeamIdParam";

import { NotificationContext } from "context/notification";

import PATHS from "router/paths";
import debounce from "utilities/debounce";
import deepDifference from "utilities/deep_difference";

import BackLink from "components/BackLink";
import EditQueryForm from "pages/queries/edit/components/EditQueryForm";
import { IConfig } from "interfaces/config";

interface IEditQueryPageProps {
  router: InjectedRouter;
  params: Params;
  location: {
    pathname: string;
    query: { host_ids: string; team_id?: string };
    search: string;
  };
}

const baseClass = "edit-query-page";

const EditQueryPage = ({
  router,
  params: { id: paramsQueryId },
  location,
}: IEditQueryPageProps): JSX.Element => {
  const queryId = paramsQueryId ? parseInt(paramsQueryId, 10) : null;
  const {
    currentTeamName: teamNameForQuery,
    teamIdForApi: apiTeamIdForQuery,
  } = useTeamIdParam({
    location,
    router,
    includeAllTeams: true,
    includeNoTeam: false,
  });

  const handlePageError = useErrorHandler();
  const {
    isGlobalAdmin,
    isGlobalMaintainer,
    isTeamMaintainerOrTeamAdmin,
    isAnyTeamMaintainerOrTeamAdmin,
    isObserverPlus,
    isAnyTeamObserverPlus,
    config,
  } = useContext(AppContext);
  const {
    selectedOsqueryTable,
    setSelectedOsqueryTable,
    lastEditedQueryName,
    lastEditedQueryDescription,
    lastEditedQueryBody,
    lastEditedQueryObserverCanRun,
    lastEditedQueryFrequency,
    lastEditedQueryPlatforms,
    lastEditedQueryLoggingType,
    lastEditedQueryMinOsqueryVersion,
    lastEditedQueryDiscardData,
    setLastEditedQueryId,
    setLastEditedQueryName,
    setLastEditedQueryDescription,
    setLastEditedQueryBody,
    setLastEditedQueryObserverCanRun,
    setLastEditedQueryFrequency,
    setLastEditedQueryLoggingType,
    setLastEditedQueryMinOsqueryVersion,
    setLastEditedQueryPlatforms,
    setLastEditedQueryDiscardData,
  } = useContext(QueryContext);
  const { setConfig, availableTeams, setCurrentTeam } = useContext(AppContext);
  const { renderFlash } = useContext(NotificationContext);

  const [isLiveQueryRunnable, setIsLiveQueryRunnable] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showOpenSchemaActionText, setShowOpenSchemaActionText] = useState(
    false
  );
  const [
    showConfirmSaveChangesModal,
    setShowConfirmSaveChangesModal,
  ] = useState(false);

  const { data: appConfig } = useQuery<IConfig, Error, IConfig>(
    ["config"],
    () => configAPI.loadAll(),
    {
      select: (data: IConfig) => data,
      onSuccess: (data) => {
        setConfig(data);
      },
    }
  );

  // disabled on page load so we can control the number of renders
  // else it will re-populate the context on occasion
  const {
    isLoading: isStoredQueryLoading,
    data: storedQuery,
    refetch: refetchStoredQuery,
  } = useQuery<IGetQueryResponse, Error, ISchedulableQuery>(
    ["query", queryId],
    () => queryAPI.load(queryId as number),
    {
      enabled: !!queryId,
      refetchOnWindowFocus: false,
      select: (data) => data.query,
      onSuccess: (returnedQuery) => {
        setLastEditedQueryId(returnedQuery.id);
        setLastEditedQueryName(returnedQuery.name);
        setLastEditedQueryDescription(returnedQuery.description);
        setLastEditedQueryBody(returnedQuery.query);
        setLastEditedQueryObserverCanRun(returnedQuery.observer_can_run);
        setLastEditedQueryFrequency(returnedQuery.interval);
        setLastEditedQueryPlatforms(returnedQuery.platform);
        setLastEditedQueryLoggingType(returnedQuery.logging);
        setLastEditedQueryMinOsqueryVersion(returnedQuery.min_osquery_version);
        setLastEditedQueryDiscardData(returnedQuery.discard_data);
      },
      onError: (error) => handlePageError(error),
    }
  );

  // Used to set host's team in AppContext for RBAC actions
  useEffect(() => {
    if (storedQuery?.team_id) {
      const querysTeam = availableTeams?.find(
        (team) => team.id === storedQuery.team_id
      );
      setCurrentTeam(querysTeam);
    }
  }, [storedQuery]);

  const detectIsFleetQueryRunnable = () => {
    statusAPI.live_query().catch(() => {
      setIsLiveQueryRunnable(false);
    });
  };

  /* Observer/Observer+ cannot edit existing query (O+ has access to edit new query to run live),
 reroute edit existing query page (/:queryId/edit) to query report page (/:queryId) */
  useEffect(() => {
    const canEditExistingQuery =
      isGlobalAdmin || isGlobalMaintainer || isTeamMaintainerOrTeamAdmin;

    if (
      !isStoredQueryLoading && // Confirms teamId for storedQuery before RBAC reroute
      queryId &&
      queryId > 0 &&
      !canEditExistingQuery
    ) {
      router.push(PATHS.QUERY(queryId));
    }
  }, [queryId, isTeamMaintainerOrTeamAdmin, isStoredQueryLoading]);

  useEffect(() => {
    detectIsFleetQueryRunnable();
    if (!queryId) {
      setLastEditedQueryId(DEFAULT_QUERY.id);
      setLastEditedQueryName(DEFAULT_QUERY.name);
      setLastEditedQueryDescription(DEFAULT_QUERY.description);
      // Persist lastEditedQueryBody through live query flow instead of resetting to DEFAULT_QUERY.query
      setLastEditedQueryObserverCanRun(DEFAULT_QUERY.observer_can_run);
      setLastEditedQueryFrequency(DEFAULT_QUERY.interval);
      setLastEditedQueryLoggingType(DEFAULT_QUERY.logging);
      setLastEditedQueryMinOsqueryVersion(DEFAULT_QUERY.min_osquery_version);
      setLastEditedQueryPlatforms(DEFAULT_QUERY.platform);
      setLastEditedQueryDiscardData(DEFAULT_QUERY.discard_data);
    }
  }, [queryId]);

  const [isQuerySaving, setIsQuerySaving] = useState(false);
  const [isQueryUpdating, setIsQueryUpdating] = useState(false);
  const [backendValidators, setBackendValidators] = useState<{
    [key: string]: string;
  }>({});

  // Updates title that shows up on browser tabs
  useEffect(() => {
    // e.g., Query details | Discover TLS certificates | Fleet for osquery
    document.title = `Edit query | ${storedQuery?.name} | Fleet for osquery`;
  }, [location.pathname, storedQuery?.name]);

  useEffect(() => {
    setShowOpenSchemaActionText(!isSidebarOpen);
  }, [isSidebarOpen]);

  const onSubmitNewQuery = debounce(
    async (formData: ICreateQueryRequestBody) => {
      setIsQuerySaving(true);
      try {
        const { query } = await queryAPI.create(formData);
        router.push(PATHS.QUERY(query.id, query.team_id));
        renderFlash("success", "Query created!");
        setBackendValidators({});
      } catch (createError: any) {
        if (createError.data.errors[0].reason.includes("already exists")) {
          const teamErrorText =
            teamNameForQuery && apiTeamIdForQuery !== 0
              ? `the ${teamNameForQuery} team`
              : "all teams";
          setBackendValidators({
            name: `A query with that name already exists for ${teamErrorText}.`,
          });
        } else {
          renderFlash(
            "error",
            "Something went wrong creating your query. Please try again."
          );
          setBackendValidators({});
        }
      } finally {
        setIsQuerySaving(false);
      }
    }
  );

  const onUpdateQuery = async (formData: ICreateQueryRequestBody) => {
    if (!queryId) {
      return false;
    }

    setIsQueryUpdating(true);

    const updatedQuery = deepDifference(formData, {
      lastEditedQueryName,
      lastEditedQueryDescription,
      lastEditedQueryBody,
      lastEditedQueryObserverCanRun,
      lastEditedQueryFrequency,
      lastEditedQueryPlatforms,
      lastEditedQueryLoggingType,
      lastEditedQueryMinOsqueryVersion,
      lastEditedQueryDiscardData,
    });

    try {
      await queryAPI.update(queryId, updatedQuery);
      renderFlash("success", "Query updated!");
      refetchStoredQuery(); // Required to compare recently saved query to a subsequent save to the query
    } catch (updateError: any) {
      console.error(updateError);
      if (updateError.data.errors[0].reason.includes("Duplicate")) {
        renderFlash("error", "A query with this name already exists.");
      } else {
        renderFlash(
          "error",
          "Something went wrong updating your query. Please try again."
        );
      }
    }

    setIsQueryUpdating(false);
    setShowConfirmSaveChangesModal(false); // Closes conditionally opened modal when discarding previous results

    return false;
  };

  const onOsqueryTableSelect = (tableName: string) => {
    setSelectedOsqueryTable(tableName);
  };

  const onCloseSchemaSidebar = () => {
    setIsSidebarOpen(false);
  };

  const onOpenSchemaSidebar = () => {
    setIsSidebarOpen(true);
  };

  const renderLiveQueryWarning = (): JSX.Element | null => {
    if (isLiveQueryRunnable || config?.server_settings.live_query_disabled) {
      return null;
    }

    return (
      <div className={`${baseClass}__warning`}>
        <div className={`${baseClass}__message`}>
          <p>
            Fleet is unable to run a live query. Refresh the page or log in
            again. If this keeps happening please{" "}
            <CustomLink
              url="https://github.com/fleetdm/fleet/issues/new/choose"
              text="file an issue"
              newTab
            />
          </p>
        </div>
      </div>
    );
  };

  // Function instead of constant eliminates race condition
  const backToQueriesPath = () => {
    return queryId ? PATHS.QUERY(queryId) : PATHS.MANAGE_QUERIES;
  };

  const showSidebar =
    isSidebarOpen &&
    (isGlobalAdmin ||
      isGlobalMaintainer ||
      isAnyTeamMaintainerOrTeamAdmin ||
      isObserverPlus ||
      isAnyTeamObserverPlus);

  return (
    <>
      <MainContent className={baseClass}>
        <div className={`${baseClass}_wrapper`}>
          <div className={`${baseClass}__form`}>
            <div className={`${baseClass}__header-links`}>
              <BackLink
                text={queryId ? "Back to report" : "Back to queries"}
                path={backToQueriesPath()}
              />
            </div>
            <EditQueryForm
              router={router}
              onSubmitNewQuery={onSubmitNewQuery}
              onOsqueryTableSelect={onOsqueryTableSelect}
              onUpdate={onUpdateQuery}
              storedQuery={storedQuery}
              queryIdForEdit={queryId}
              apiTeamIdForQuery={apiTeamIdForQuery}
              teamNameForQuery={teamNameForQuery}
              isStoredQueryLoading={isStoredQueryLoading}
              showOpenSchemaActionText={showOpenSchemaActionText}
              onOpenSchemaSidebar={onOpenSchemaSidebar}
              renderLiveQueryWarning={renderLiveQueryWarning}
              backendValidators={backendValidators}
              isQuerySaving={isQuerySaving}
              isQueryUpdating={isQueryUpdating}
              hostId={parseInt(location.query.host_ids as string, 10)}
              queryReportsDisabled={
                appConfig?.server_settings.query_reports_disabled
              }
              showConfirmSaveChangesModal={showConfirmSaveChangesModal}
              setShowConfirmSaveChangesModal={setShowConfirmSaveChangesModal}
            />
          </div>
        </div>
      </MainContent>
      {showSidebar && (
        <SidePanelContent>
          <QuerySidePanel
            onOsqueryTableSelect={onOsqueryTableSelect}
            selectedOsqueryTable={selectedOsqueryTable}
            onClose={onCloseSchemaSidebar}
          />
        </SidePanelContent>
      )}
    </>
  );
};

export default EditQueryPage;
