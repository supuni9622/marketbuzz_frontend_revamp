"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type { JsonGroup, Config, ImmutableTree } from "@react-awesome-query-builder/core";
import { Utils as QbUtils } from "@react-awesome-query-builder/core";
import { Query, Builder, BasicConfig } from '@react-awesome-query-builder/ui';
import '@react-awesome-query-builder/ui/css/styles.css';
import { useCustomersStore } from '@/store/useCustomersStore';
import { CustomersFilterTasks } from '@/types/customers';
import { filterConfig } from "./CustomersFilterConfig";
import { Utility } from "@/utility/Utility";
import {useToggle } from "../../../customHooks";
import CustomerSegmentCreate from "./CustomerSegmentCreate";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const queryValue: JsonGroup = {
  id: QbUtils.uuid(),
  type: "group",
  properties: {
    conjunction: "AND",
    not: false
  },
  children1: {}
};

interface CustomersFilterProps {
  isLoading: boolean;
  setIsFilterResult: (isFilterResult: boolean) => void;
  onFilterCustomers: (filters: any) => void;
  currentFilters: {};
  setCurrentFilters: (currentFilters: {}) => void;
  handleSegmentCreationSuccess: () => void;
}

const CustomersFilter: React.FC<CustomersFilterProps> = ({
  isLoading,
  setIsFilterResult,
  onFilterCustomers,
  currentFilters,
  setCurrentFilters,
  handleSegmentCreationSuccess
}) => {
  const setQueryTask = useCustomersStore((state) => state.setQueryTask);
  const [state, setState] = useState({
    tree: QbUtils.loadTree(queryValue),
    config: filterConfig
  });

  const [showCreateFilter, toggleShowCreateFilter] = useToggle(false);

  const onChange = useCallback(
    (immutableTree: ImmutableTree, filterConfig: Config) => {
      setState((prevState:any) => ({
        ...prevState,
        tree: immutableTree,
        config: filterConfig
      }));

      const jsonTree = QbUtils.getTree(immutableTree);
      // `jsonTree` can be saved to backend, and later loaded to `queryValue`
    },
    []
  );

  const renderBuilder = useCallback(
    (props:any) => (
      <div className="query-builder-container" style={{ padding: "10px" }}>
        <div className="query-builder qb-lite">
          <Builder {...props} />
        </div>
      </div>
    ),
    []
  );

  const onApplyFilter = useCallback(() => {
    setIsFilterResult(true);
    setCurrentFilters(QbUtils.getTree(state.tree));
    onFilterCustomers(QbUtils.getTree(state.tree));
  }, [state, setCurrentFilters, onFilterCustomers, setIsFilterResult]);

  const onClickSaveFilter = useCallback(() => {
    onApplyFilter();
    toggleShowCreateFilter();
  }, [onApplyFilter, toggleShowCreateFilter]);

  const onClickClearFilter = useCallback(() => {
    setState({
      tree: QbUtils.loadTree(queryValue),
      config: filterConfig
    });
    setCurrentFilters({});
    setIsFilterResult(false);
    setQueryTask({ task: CustomersFilterTasks.getAllCustomers, query: {} });
  }, [setCurrentFilters, setState, setIsFilterResult, setQueryTask]);

  const hasFilters = useMemo(() => {
    return !Utility.isEqualObjects(QbUtils.getTree(state.tree), queryValue);
  }, [state]);

  useEffect(() => {
    if (
      currentFilters &&
      !Utility.isEmptyObject(currentFilters) &&
      !Utility.isEqualObjects(QbUtils.getTree(state.tree), currentFilters)
    ) {
      setState({
        tree: QbUtils.loadTree(queryValue),
        config: filterConfig
      });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilters]);

  return (
    <Card className="border p-4 bg-white shadow-md">
      <CardContent>
        <Query
          {...state.config}
          value={state.tree}
          onChange={onChange}
          renderBuilder={renderBuilder}
        />
        {hasFilters && (
          <div className="text-center mt-4">
            <Button
              className="mx-2"
              color="primary"
              size="sm"
              disabled={
                isLoading ||
                Utility.isEqualObjects(
                  QbUtils.getTree(state.tree),
                  currentFilters
                )
              }
              onClick={onApplyFilter}
            >
              Apply Filter
            </Button>

            <Button
              color="outline-primary"
              size="sm"
              disabled={isLoading}
              onClick={onClickSaveFilter}
            >
              Save Filter {showCreateFilter}
            </Button>

            <Button
              className="mx-2"
              color="outline-danger"
              size="sm"
              disabled={isLoading}
              onClick={onClickClearFilter}
            >
              Clear Filter
            </Button>
          </div>
        )}
      </CardContent>

      {showCreateFilter && (
        <CustomerSegmentCreate
          show={showCreateFilter}
          onHide={toggleShowCreateFilter}
          currentFilters={currentFilters}
          handleSegmentCreationSuccess={handleSegmentCreationSuccess}
        />
      )}
    </Card>
  );
};

export default CustomersFilter;
