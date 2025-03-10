import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { InjectedRouter, Params } from "react-router/lib/Router";
import { useErrorHandler } from "react-error-boundary";
import ReactTooltip from "react-tooltip";
import { COLORS } from "styles/var/colors";

import PATHS from "router/paths";
import { AppContext } from "context/app";
import { QueryContext } from "context/query";

import {
  IGetQueryResponse,
  ISchedulableQuery,
} from "interfaces/schedulable_query";
import { IQueryReport } from "interfaces/query_report";

import queryAPI from "services/entities/queries";
import queryReportAPI, { ISortOption } from "services/entities/query_report";

import Spinner from "components/Spinner/Spinner";
import Button from "components/buttons/Button";
import BackLink from "components/BackLink";
import MainContent from "components/MainContent";
import TooltipWrapper from "components/TooltipWrapper/TooltipWrapper";
import QueryAutomationsStatusIndicator from "pages/queries/ManageQueriesPage/components/QueryAutomationsStatusIndicator/QueryAutomationsStatusIndicator";
import DataError from "components/DataError/DataError";
import LogDestinationIndicator from "components/LogDestinationIndicator/LogDestinationIndicator";
import CustomLink from "components/CustomLink";
import InfoBanner from "components/InfoBanner";
import QueryReport from "../components/QueryReport/QueryReport";
import NoResults from "../components/NoResults/NoResults";

import {
  DEFAULT_SORT_HEADER,
  DEFAULT_SORT_DIRECTION,
  QUERY_REPORT_RESULTS_LIMIT,
} from "./QueryDetailsPageConfig";

interface IQueryDetailsPageProps {
  router: InjectedRouter; // v3
  params: Params;
  location: {
    pathname: string;
    query: { team_id?: string; order_key?: string; order_direction?: string };
    search: string;
  };
}

const baseClass = "query-details-page";

const QueryDetailsPage = ({
  router,
  params: { id: paramsQueryId },
  location,
}: IQueryDetailsPageProps): JSX.Element => {
  const queryId = parseInt(paramsQueryId, 10);
  const queryParams = location.query;
  const teamId = location.query.team_id
    ? parseInt(location.query.team_id, 10)
    : undefined;

  // Functions to avoid race conditions
  const serverSortBy: ISortOption[] = (() => {
    return [
      {
        key: queryParams?.order_key ?? DEFAULT_SORT_HEADER,
        direction: queryParams?.order_direction ?? DEFAULT_SORT_DIRECTION,
      },
    ];
  })();

  const handlePageError = useErrorHandler();
  const {
    isGlobalAdmin,
    isGlobalMaintainer,
    isTeamMaintainerOrTeamAdmin,
    isObserverPlus,
    isAnyTeamObserverPlus,
    config,
    filteredQueriesPath,
    availableTeams,
    setCurrentTeam,
    currentTeam,
  } = useContext(AppContext);
  const {
    lastEditedQueryName,
    lastEditedQueryDescription,
    lastEditedQueryObserverCanRun,
    lastEditedQueryDiscardData,
    lastEditedQueryLoggingType,
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

  // Title that shows up on browser tabs (e.g., Query details | Discover TLS certificates | Fleet for osquery)
  document.title = `Query details | ${lastEditedQueryName} | Fleet for osquery`;

  const [disabledCachingGlobally, setDisabledCachingGlobally] = useState(true);

  useEffect(() => {
    if (config) {
      setDisabledCachingGlobally(config.server_settings.query_reports_disabled);
    }
  }, [config]);

  // disabled on page load so we can control the number of renders
  // else it will re-populate the context on occasion
  const {
    isLoading: isStoredQueryLoading,
    data: storedQuery,
    error: storedQueryError,
  } = useQuery<IGetQueryResponse, Error, ISchedulableQuery>(
    ["query", queryId],
    () => queryAPI.load(queryId),
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

  const {
    isLoading: isQueryReportLoading,
    data: queryReport,
    error: queryReportError,
  } = useQuery<IQueryReport, Error, IQueryReport>(
    [],
    () =>
      queryReportAPI.load({
        sortBy: serverSortBy,
        id: queryId,
      }),
    {
      enabled: !!queryId,
      refetchOnWindowFocus: false,
      onError: (error) => handlePageError(error),
    }
  );

  // Used to set host's team in AppContext for RBAC action buttons
  useEffect(() => {
    if (storedQuery?.team_id) {
      const querysTeam = availableTeams?.find(
        (team) => team.id === storedQuery.team_id
      );
      setCurrentTeam(querysTeam);
    }
  }, [storedQuery]);

  const isLoading = isStoredQueryLoading || isQueryReportLoading;
  const isApiError = storedQueryError || queryReportError;
  const isClipped =
    (queryReport?.results?.length ?? 0) >= QUERY_REPORT_RESULTS_LIMIT;
  const disabledLiveQuery = config?.server_settings.live_query_disabled;

  const renderHeader = () => {
    const canEditQuery =
      isGlobalAdmin || isGlobalMaintainer || isTeamMaintainerOrTeamAdmin;

    // Function instead of constant eliminates race condition with filteredQueriesPath
    const backToQueriesPath = () => {
      return filteredQueriesPath || PATHS.MANAGE_QUERIES;
    };

    return (
      <>
        <div className={`${baseClass}__header-links`}>
          <BackLink text="Back to queries" path={backToQueriesPath()} />
        </div>
        <div className={`${baseClass}__header-details`}>
          {!isLoading && !isApiError && (
            <div className={`${baseClass}__title-bar`}>
              <div className="name-description">
                <h1 className={`${baseClass}__query-name`}>
                  {lastEditedQueryName}
                </h1>
                <p className={`${baseClass}__query-description`}>
                  {lastEditedQueryDescription}
                </p>
              </div>
              <div className={`${baseClass}__action-button-container`}>
                {canEditQuery && (
                  <Button
                    onClick={() => {
                      queryId && router.push(PATHS.EDIT_QUERY(queryId, teamId));
                    }}
                    className={`${baseClass}__manage-automations button`}
                    variant="brand"
                  >
                    Edit query
                  </Button>
                )}
                {(lastEditedQueryObserverCanRun ||
                  isObserverPlus ||
                  isAnyTeamObserverPlus ||
                  canEditQuery) && (
                  <div
                    className={`${baseClass}__button-wrap ${baseClass}__button-wrap--new-query`}
                  >
                    <div
                      data-tip
                      data-for="live-query-button"
                      // Tooltip shows when live queries are globally disabled
                      data-tip-disable={!disabledLiveQuery}
                    >
                      <Button
                        className={`${baseClass}__run`}
                        variant="blue-green"
                        onClick={() => {
                          queryId && router.push(PATHS.LIVE_QUERY(queryId));
                        }}
                        disabled={disabledLiveQuery}
                      >
                        Live query
                      </Button>
                    </div>
                    <ReactTooltip
                      className="live-query-button-tooltip"
                      place="top"
                      effect="solid"
                      backgroundColor={COLORS["tooltip-bg"]}
                      id="live-query-button"
                      data-html
                    >
                      Live queries are disabled in organization settings
                    </ReactTooltip>
                  </div>
                )}
              </div>
            </div>
          )}
          {!isLoading && !isApiError && (
            <div className={`${baseClass}__settings`}>
              <div className={`${baseClass}__automations`}>
                <TooltipWrapper
                  // TODO - change to JSX after tooltip refactor
                  tipContent={`Query automations let you send data to your log <br />destination on a schedule. When automations are <b>on</b>, <br />data is sent according to a query’s frequency.`}
                >
                  Automations:
                </TooltipWrapper>
                <QueryAutomationsStatusIndicator
                  automationsEnabled={storedQuery?.automations_enabled || false}
                  interval={storedQuery?.interval || 0}
                />
              </div>
              <div className={`${baseClass}__log-destination`}>
                <strong>Log destination:</strong>{" "}
                <LogDestinationIndicator
                  logDestination={config?.logging.result.plugin || ""}
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderClippedBanner = () => (
    <InfoBanner
      color="yellow"
      cta={
        <CustomLink
          url="https://www.fleetdm.com/support"
          text="Get help"
          newTab
        />
      }
    >
      <div>
        <b>Report clipped.</b> A sample of this query&apos;s results is included
        below. You can still use query automations to complete this report in
        your log destination.
      </div>
    </InfoBanner>
  );

  const renderReport = () => {
    const loggingSnapshot = lastEditedQueryLoggingType === "snapshot";
    const disabledCaching =
      disabledCachingGlobally || lastEditedQueryDiscardData || !loggingSnapshot;
    const emptyCache = (queryReport?.results?.length ?? 0) === 0;

    // Loading state
    if (isLoading) {
      return <Spinner />;
    }

    // Error state
    if (isApiError) {
      return <DataError />;
    }

    // Empty state with varying messages explaining why there's no results
    if (emptyCache) {
      return (
        <NoResults
          queryInterval={storedQuery?.interval}
          queryUpdatedAt={storedQuery?.updated_at}
          disabledCaching={disabledCaching}
          disabledCachingGlobally={disabledCachingGlobally}
          discardDataEnabled={lastEditedQueryDiscardData}
          loggingSnapshot={loggingSnapshot}
        />
      );
    }
    return <QueryReport queryReport={queryReport} isClipped={isClipped} />;
  };

  return (
    <MainContent className={baseClass}>
      <div className={`${baseClass}__wrapper`}>
        {renderHeader()}
        {isClipped && renderClippedBanner()}
        {renderReport()}
      </div>
    </MainContent>
  );
};

export default QueryDetailsPage;
