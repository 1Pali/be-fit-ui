sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/m/MessageBox" ], function(Controller, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("techEd2018NetworkGraph.controller.TransportLandscape", {

        onInit : function() {
        	var that = this;
        	this.graphModel = new JSONModel("graph.json");
			this.getView().setModel(this.graphModel);
			this.allNodes = new JSONModel("nodes.json");
			this.allRoutes = new JSONModel("routes.json");
			this._nodeProperties = this.getView().byId("nodeProperties");
			this._routeProperties = this.getView().byId("routeProperties");

			this._oModelSettings = new JSONModel({
				orientation: "LeftRight",
				arrowPosition: "End",
				arrowOrientation: "ParentOf",
				nodePlacement: "Simple",
				nodeSpacing: 55,
				mergeEdges: false
			});

			this.getView().setModel(this._oModelSettings, "settings");
			
			this._graph = this.byId("graph");
			
			//Set custom labels for legend
			
			//Try to add custom buttons to graph toolbar
			this._graphToolbar = this.byId("graph-toolbar");
			this._sideContent = this.byId("sideContent");
			
			var addNodeButton = new sap.m.Button("addNodeButton", {
				icon : "sap-icon://add",
				type : "Transparent",
				tooltip: "Create a Node",
				press : function() {
					//open create node dialog
					if (!that._createNodeDialog) {
	                    that._createNodeDialog = sap.ui.xmlfragment("techEd2018NetworkGraph.view.fragments.CreateNodeDialog", that);
	                    that.getView().addDependent(that._createNodeDialog);
	                }
					that._createNodeDialog.open();
				}
			});
			
			var addRouteButton = new sap.m.Button("addRouteButton", {
				icon : "sap-icon://connected",
				type : "Transparent",
				tooltip: "Create a Route",
				press : function() {
					//open create route dialog
					if (!that._createRouteDialog) {
	                    that._createRouteDialog = sap.ui.xmlfragment("techEd2018NetworkGraph.view.fragments.CreateRouteDialog", that);
	                    that.getView().addDependent(that._createRouteDialog);
	                }
					that._createRouteDialog.open();
				}
			});
			
			var editNodeorRouteButton = new sap.m.Button("editNodeorRouteButton", {
				icon : "sap-icon://edit",
				type : "Transparent",
				tooltip: "Edit a Node",
				enabled: false,
				press : function() {
					//check whether node or route is currently selected
					if(that.currentlySelectedItem === "route") {
						//open edit route dialog
						that.onEditRoutePress();
					} else if(that.currentlySelectedItem === "node") {
						//open edit node dialog
						that.onEditNodePress();
					}
				}
			});
			
			var deleteNodeorRouteButton = new sap.m.Button("deleteNodeorRouteButton", {
				icon : "sap-icon://delete",
				type : "Transparent",
				tooltip: "Delete a Node",
				enabled: false,
				press : function() {
					//check whether node or route is currently selected
					if(that.currentlySelectedItem === "route") {
						//open delete route dialog
						that.onDeleteRoutePress();
					} else if(that.currentlySelectedItem === "node") {
						//open delete node dialog
						that.onDeleteNodePress();
					}
				}
			});
			
			var propertiesButton = new sap.m.Button("propertiesButton", {
				icon : "sap-icon://notes",
				type : "Transparent",
				tooltip: "See Properties",
				enabled: false,
				press : function() {
					//open properties panel
					//set layoutdata for panel to size 0
					var size = that.getView().byId("panelSplitterLayoutData").getSize();
					if(size == "0%") {
						that.getView().byId("panelSplitterLayoutData").setSize("25%");
					} else {
						that.hideSideContent();
					}
				}
			});
			
			//remove search field
			this._graphToolbar.removeContent(1);
			
			this._graphToolbar.insertContent(addNodeButton, 0);
			this._graphToolbar.insertContent(addRouteButton, 1);
			this._graphToolbar.insertContent(editNodeorRouteButton, 2);
			this._graphToolbar.insertContent(deleteNodeorRouteButton, 3);
			this._graphToolbar.insertContent(propertiesButton, 4);
			
			// custom labels
			this._graph.setCustomLegendLabel({
				label: "Node OK",
				status: "Standard"
			});
			
			this._graph.setCustomLegendLabel({
				label: "Import errors",
				status: "Warning"
			});
			
			this._graph.setCustomLegendLabel({
				label: "Destination error",
				status: "Error"
			});

			// custom labels
			this._graph.setCustomLegendLabel({
				label: "Route OK",
				status: "Standard",
				isNode: false
			});

        },
        
        autoZoom : function() {
        	//zoom in graph
        	//TODO: get _fitToScreen function from Graph.js instead
        	this._graph.zoom({x:1, y:-1, zoomin:true, zoomLevel:1.75});
        },
        
        goToOverviewPage : function() {
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	oRouter.navTo("Overview");
        },
        
        onGraphSelect : function(oEvent) {
        	var items = oEvent.getParameters().items;
        	var item = oEvent.getParameters().items[items.length -1];
        	var isSelected = item.getSelected();
        	var isRoute = item.getFrom;
        	if(isSelected && (isRoute === undefined)) {
        		this.getView().byId("propertiesPlaceholderText").setVisible(false);
        		//is a node
        		//make properties button enabled
            	if(this._nodeProperties.getVisible() === false) {
            		this._nodeProperties.setVisible(true);
            		this._routeProperties.setVisible(false);
            	} else {
            		this._routeProperties.setVisible(false);
            	}
            	var nodeId = parseInt(item.getKey());
            	var allNodes = this.allNodes.getData();
            	sap.ui.getCore().byId("propertiesButton").setEnabled(true);
            	var selectedNode = $.grep(allNodes, function(n) {
            		return n.id === nodeId;
            	})[0];
            	var selectedNodeModel = new JSONModel(selectedNode);
            	this.getView().setModel(selectedNodeModel, "selectedNode");
            	sap.ui.getCore().byId("editNodeorRouteButton").setEnabled(true);
            	sap.ui.getCore().byId("deleteNodeorRouteButton").setEnabled(true);
            	this.currentlySelectedItem = "node";
        	} else if(isSelected && isRoute) {
        		this.getView().byId("propertiesPlaceholderText").setVisible(false);
        		//is a route
        		//make properties button enabled
            	if(this._routeProperties.getVisible() === false) {
            		this._routeProperties.setVisible(true);
            		this._nodeProperties.setVisible(false);
            	} else {
            		this._nodeProperties.setVisible(false);
            	}
            	var routeFrom = parseInt(item.getFrom());
            	var routeTo = parseInt(item.getTo());
            	var allRoutes = this.allRoutes.getData();
            	sap.ui.getCore().byId("propertiesButton").setEnabled(true);
            	var selectedRoute = $.grep(allRoutes, function(r) {
            		return (r.from === routeFrom && r.to == routeTo);
            	})[0];
            	var selectedRouteModel = new JSONModel(selectedRoute);
            	this.getView().setModel(selectedRouteModel, "selectedRoute");
            	sap.ui.getCore().byId("editNodeorRouteButton").setEnabled(true);
            	sap.ui.getCore().byId("deleteNodeorRouteButton").setEnabled(true);
            	this.currentlySelectedItem = "route";
        	}
        	if(!isSelected) {
        		this.getView().byId("propertiesPlaceholderText").setVisible(true);
        		this._routeProperties.setVisible(false);
        		this._nodeProperties.setVisible(false);
        		sap.ui.getCore().byId("editNodeorRouteButton").setEnabled(true);
            	sap.ui.getCore().byId("deleteNodeorRouteButton").setEnabled(true);
        	}
        },
        
        formatUploadAllowed : function(uploadAllowed) {
        	var answer = "";
        	switch (uploadAllowed) {
        	case true:
        		answer = "Yes";
        		break;
        	case false:
        		answer =  "No";
        		break;
        	}
        	return answer;
        },
        
        navigateToImportQueue : function() {
        	//navigate to fake import queue
        	var allNodesData = this.allNodes.getData();
			//save node data to session storage
			jQuery.sap.storage(jQuery.sap.storage.Type.session).put("allNodes", JSON.stringify(allNodesData));
        	var nodeId = this.getView().getModel("selectedNode").getData().id;
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	oRouter.navTo("ImportQueue", {
                nodeid : nodeId
            });
        },
        
        onRoutePress : function(oEvent) {
        	//prevent tooltip from coming up
        	oEvent.preventDefault();
        },
        
        hideSideContent : function() {
        	sap.ui.getCore().byId("addNodeButton").setEnabled(true);
        	sap.ui.getCore().byId("addRouteButton").setEnabled(true);
        	//set layoutdata for panel to size 0
        	this.getView().byId("panelSplitterLayoutData").setSize("0%");
        },
        
        onCreateNode : function() {
        	//Do actual node creation here. NOTE: only lasts as long as browser session
        	var that = this;
        	var createNodeName = sap.ui.getCore().byId("nodeName").getValue();
        	var createNodeDescription = sap.ui.getCore().byId("nodeDescription").getValue();
        	var createNodeUpload = sap.ui.getCore().byId("allowUploadCheckbox").getSelected();
        	var createNodeRole = sap.ui.getCore().byId("nodeTargetRole").getSelectedKey() || "";
        	if(sap.ui.getCore().byId("nodeTargetCT").getSelectedItem() != null) {
        		var createNodeCTText = sap.ui.getCore().byId("nodeTargetCT").getSelectedItem().getText();
        	} else {
        		var createNodeCTText = "";
        	}
        	var createNodeCT = sap.ui.getCore().byId("nodeTargetCT").getSelectedKey() || "";
        	if(sap.ui.getCore().byId("nodeDestIDTarget").getSelectedItem() != null) {
        		var createNodeDestText = sap.ui.getCore().byId("nodeDestIDTarget").getSelectedItem().getText();
        	} else {
        		var createNodeDestText = "";
        	}
        	var createNodeDest = sap.ui.getCore().byId("nodeDestIDTarget").getSelectedKey() || "";
        	var currentNumberOfNodes = this.graphModel.getData().nodes.length;
        	var currentGraphModel = this.graphModel.getData();
        	var currentNodes = this.allNodes.getData();
        	
        	var newGraphNode = new sap.suite.ui.commons.networkgraph.Node({
        		"width": 220,
        		"height": 200,
        		"key": currentNumberOfNodes,
    			"title": createNodeName + " (" + createNodeRole + ")",
    			"shape": "Box",
    			"showExpandButton": false,
    			"showDetailButton": false,
    			"showActionLinksButton": false,
    			"attributes": [{"label" : "Initial", "value": "0"},
    				{"label" : "Running", "value" : "0"},
    				{"label" : "Fatal/Error", "value": "0"}]
        	});
        	
        	//need to add custom action buttons here as well        	
        	var addRouteBtn = new sap.suite.ui.commons.networkgraph.ActionButton({
        		"icon": "sap-icon://connected",
        		"title": "Add Route",
        		"press": function() {
        			//open create route dialog
        			if (!that._createRouteDialog) {
        				that._createRouteDialog = sap.ui.xmlfragment("techEd2018NetworkGraph.view.fragments.CreateRouteDialog", that);
        				that.getView().addDependent(that._createRouteDialog);
                    }
        			that._createRouteDialog.open();
        		}
        	});
        	
        	var importQueueBtn = new sap.suite.ui.commons.networkgraph.ActionButton({
        		"icon": "sap-icon://list",
        		"title": "Go to Import Queue",
        		"press": function() {
        			//navigate to fake import queue
                	var allNodesData = that.allNodes.getData();
        			//save node data to session storage
        			jQuery.sap.storage(jQuery.sap.storage.Type.session).put("allNodes", JSON.stringify(allNodesData));
                	var nodeId = that.getView().getModel("selectedNode").getData().id;
                	var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                	oRouter.navTo("ImportQueue", {
                        nodeid : nodeId
                    });
        		}
        	});
        	
        	var editNodeBtn = new sap.suite.ui.commons.networkgraph.ActionButton({
        		"icon": "sap-icon://edit",
        		"title": "Edit Node",
        		"press": function() {
        			//open edit node dialog
        			if (!that._editNodeDialog) {
        				that._editNodeDialog = sap.ui.xmlfragment("techEd2018NetworkGraph.view.fragments.EditNodeDialog", that);
        				that.getView().addDependent(that._editNodeDialog);
                    }
        			
        			that._editNodeDialog.open();
        		}
        	});
        	
        	var deleteNodeBtn = new sap.suite.ui.commons.networkgraph.ActionButton({
        		"icon": "sap-icon://delete",
        		"title": "Delete Node",
        		"press": function() {
        			//open delete node dialog
        			if (!that._deleteNodeDialog) {
        				that._deleteNodeDialog = sap.ui.xmlfragment("techEd2018NetworkGraph.view.fragments.DeleteNodeWarningDialog", that);
        				that.getView().addDependent(that._deleteNodeDialog);
                    }
        			that._deleteNodeDialog.open();
        		}
        	});
        	
        	newGraphNode.addActionButton(addRouteBtn);
        	newGraphNode.addActionButton(importQueueBtn);
        	newGraphNode.addActionButton(editNodeBtn);
        	newGraphNode.addActionButton(deleteNodeBtn);
        	
        	var newNodeObject = {
				"id" : currentNumberOfNodes,
				"name" : createNodeName,
				"description" : createNodeDescription,
				"role": createNodeRole,
				"upload_allowed": createNodeUpload,
				"content_type": createNodeCTText,
				"content_type_key": createNodeCT,
				"destination": createNodeDestText,
				"destination_key": createNodeDest
            };
        	
        	this._graph.addNode(newGraphNode);
        	//also add to graph model
        	currentGraphModel.nodes.push({
        		"width": 220,
        		"height": 200,
        		"key": currentNumberOfNodes,
    			"title": createNodeName + " (" + createNodeRole + ")",
    			"shape": "Box",
    			"showExpandButton": false,
    			"showDetailButton": false,
    			"showActionLinksButton": false,
    			"attributes": [{"label" : "Initial", "value": "0"},
    				{"label" : "Running", "value" : "0"},
    				{"label" : "Fatal/Error", "value": "0"}]
        	});
        	var newGraphModel = new JSONModel(currentGraphModel);
        	this.graphModel = newGraphModel;
        	
        	currentNodes.push(newNodeObject);
        	var newNodeModel = new JSONModel(currentNodes);
        	this.allNodes = newNodeModel;
        	this.sourceNodes = currentNodes;
        	this.targetNodes = currentNodes;
        	
        	//clear form too
        	sap.ui.getCore().byId("nodeName").setValue("");
        	sap.ui.getCore().byId("nodeDescription").setValue("");
        	sap.ui.getCore().byId("allowUploadCheckbox").setSelected(false);
        	sap.ui.getCore().byId("nodeTargetRole").setSelectedKey("");
        	sap.ui.getCore().byId("nodeTargetCT").setSelectedKey("");
        	sap.ui.getCore().byId("nodeDestIDTarget").setSelectedKey("");
        	
        	this._createNodeDialog.close();
        },
        
        onCreateNodeDialogClosePress : function() {
        	sap.ui.getCore().byId("nodeName").setValue("");
        	sap.ui.getCore().byId("nodeDescription").setValue("");
        	sap.ui.getCore().byId("allowUploadCheckbox").setSelected(false);
        	sap.ui.getCore().byId("nodeTargetRole").setSelectedKey("");
        	sap.ui.getCore().byId("nodeTargetCT").setSelectedKey("");
        	sap.ui.getCore().byId("nodeDestIDTarget").setSelectedKey("");
        	this._createNodeDialog.close();
        },
        
        onAddRoutePress : function() {
        	//open create route dialog
			if (!this._createRouteDialog) {
				this._createRouteDialog = sap.ui.xmlfragment("techEd2018NetworkGraph.view.fragments.CreateRouteDialog", this);
				this.getView().addDependent(this._createRouteDialog);
            }
			this._createRouteDialog.open();
        },
        
        afterCreateRouteDialogOpen : function() {
        	//Add all nodes possible for target selection
        	if(!this.sourceNodes) {
    			this.sourceNodes = this.allNodes.getData();
        	}
        	if(!this.targetNodes) {
        		this.targetNodes = this.allNodes.getData();
        	}
        	var availableTargetsModel = new JSONModel(this.targetNodes);
    		var availableSourcesModel = new JSONModel(this.sourceNodes);
    		this._createRouteDialog.setModel(availableTargetsModel, "availableTargets");
    		this._createRouteDialog.setModel(availableSourcesModel, "availableSources");
        },
        
        onSourceTargetSelect : function(oEvent) {
            /*
             * if both source and target nodes have been selected and every
             * other item in create route form is correct, allow for creation to
             * continue
             */
            var sourceNodeSelected = sap.ui.getCore().byId("sourceNode").getSelectedKey();
            var targetNodeSelected = sap.ui.getCore().byId("targetNode").getSelectedKey();
            // Additionally, change target or source model based on selection
            var selection = parseInt(oEvent.getParameter("selectedItem").getKey());
            var parent = oEvent.getParameter("id");
            if(parent == "sourceNode") {
                // remove selected item from target model
                var updatedTargetModel = new sap.ui.model.json.JSONModel();
                var updatedTargetData = this.targetNodes.filter(function(t) { return t.id != selection; });
                updatedTargetModel.setData(updatedTargetData);
                this._createRouteDialog.setModel(updatedTargetModel, "availableTargets");
                sap.ui.getCore().byId("targetNode").setSelectedKey(targetNodeSelected);
            } else if(parent == "targetNode") {
                // remove selected item from source model
                var updatedSourceModel = new sap.ui.model.json.JSONModel();
                var updatedSourceData = this.sourceNodes.filter(function(t) { return t.id != selection; });
                updatedSourceModel.setData(updatedSourceData);
                this._createRouteDialog.setModel(updatedSourceModel, "availableSources");
                sap.ui.getCore().byId("sourceNode").setSelectedKey(sourceNodeSelected);
            }
        },
        
        onAddRoute : function() {
        	//Do actual route creation here
        	var createRouteName = sap.ui.getCore().byId("createRouteName").getValue();
        	var createRouteDescription = sap.ui.getCore().byId("createRouteDescription").getValue();
        	var createRouteSourceId = parseInt(sap.ui.getCore().byId("sourceNode").getSelectedKey());
			var createRouteSource = sap.ui.getCore().byId("sourceNode").getSelectedItem().getText();
        	var createRouteTargetId = parseInt(sap.ui.getCore().byId("targetNode").getSelectedKey());
        	var createRouteTarget = sap.ui.getCore().byId("targetNode").getSelectedItem().getText();
        	var currentNumberOfRoutes = this.graphModel.getData().lines.length;
        	var currentGraphModel = this.graphModel.getData();
        	var currentRoutes = this.allRoutes.getData();
		
		var newGraphRoute = new sap.suite.ui.commons.networkgraph.Line({
    			"from": createRouteSourceId,
    			"to": createRouteTargetId,
    			"press": function(oEvent) {
    				oEvent.preventDefault();
    			}
        	});
        	
        	var newRouteObject = {
        			"id": currentNumberOfRoutes,
        			"name": createRouteName,
        			"description": createRouteDescription,
        			"sourceNode": createRouteSource,
        			"targetNode": createRouteTarget,
        			"from": createRouteSourceId,
        			"to": createRouteTargetId
            };
        	
        	this._graph.addLine(newGraphRoute);
        	//also add to graph model
        	currentGraphModel.lines.push({
        		"from": createRouteSourceId,
    			"to": createRouteTargetId
        	});
        	var newGraphModel = new JSONModel(currentGraphModel);
        	this.graphModel = newGraphModel;
        	
        	currentRoutes.push(newRouteObject);
        	var newRouteModel = new JSONModel(currentRoutes);
        	this.allRoutes = newRouteModel;
        	
        	//clear form too
        	sap.ui.getCore().byId("createRouteName").setValue("");
        	sap.ui.getCore().byId("createRouteDescription").setValue("");
        	sap.ui.getCore().byId("sourceNode").setSelectedKey("");
        	sap.ui.getCore().byId("targetNode").setSelectedKey("");
        	
        	this._createRouteDialog.close();
        },
        
        onAddRouteClosePress : function() {
        	sap.ui.getCore().byId("createRouteName").setValue("");
        	sap.ui.getCore().byId("createRouteDescription").setValue("");
        	sap.ui.getCore().byId("sourceNode").setSelectedKey("");
        	sap.ui.getCore().byId("targetNode").setSelectedKey("");
        	this._createRouteDialog.close();
        },
        
        onEditNodePress : function() {
        	//open edit node dialog
			if (!this._editNodeDialog) {
				this._editNodeDialog = sap.ui.xmlfragment("techEd2018NetworkGraph.view.fragments.EditNodeDialog", this);
				this.getView().addDependent(this._editNodeDialog);
            }
			
			this._editNodeDialog.open();
        },
        
        onEditNode : function() {
        	//Do actual node edit here
        	var that = this;
        	var editNodeName = sap.ui.getCore().byId("editNodeName").getValue();
        	var editNodeDescription = sap.ui.getCore().byId("editNodeDescription").getValue();
        	var editNodeUpload = sap.ui.getCore().byId("editAllowUploadCheckbox").getSelected();
        	var editNodeRole = sap.ui.getCore().byId("editNodeTargetRole").getSelectedKey();
        	var editNodeCTId = sap.ui.getCore().byId("editNodeTargetCT").getSelectedKey();
        	var editNodeCT = sap.ui.getCore().byId("editNodeTargetCT").getSelectedItem().getText();
        	var editNodeDestId = sap.ui.getCore().byId("editNodeDestIDTarget").getSelectedKey();
        	var editNodeDest = sap.ui.getCore().byId("editNodeDestIDTarget").getSelectedItem().getText();
        	var currentNodes = this.allNodes.getData();
        	var graphData = this.graphModel.getData();
        	var graphNodes = graphData.nodes;
        	
        	//find specific node from all nodes
        	var nodeToEdit = $.grep(currentNodes, function(n) {
        		return n.name === editNodeName;
        	})[0];
        	
        	// first edit node in graph model
        	var nodeToEditInGraph = $.grep(graphNodes, function(n) {
        		return n.title === nodeToEdit.name + " (" + nodeToEdit.role + ")";
        	})[0];
        	
        	nodeToEditInGraph.title = editNodeName + " (" + editNodeRole + ")";
        	var attributes = nodeToEditInGraph.attributes;
        	var key = nodeToEditInGraph.key;
        	this.graphModel = new JSONModel(graphData);
        	this._graph.removeNode(nodeToEdit.id);
        	var newNode = new sap.suite.ui.commons.networkgraph.Node({
        		"width": 220,
        		"height": 200,
        		"key": key,
    			"title": editNodeName + " (" + editNodeRole + ")",
    			"shape": "Box",
    			"showExpandButton": false,
    			"showDetailButton": false,
    			"showActionLinksButton": false,
    			"attributes": attributes
        	});
        	//need to add custom action buttons here as well        	
        	var addRouteBtn = new sap.suite.ui.commons.networkgraph.ActionButton({
        		"icon": "sap-icon://connected",
        		"title": "Add Route",
        		"press": function() {
        			//open create route dialog
        			if (!that._createRouteDialog) {
        				that._createRouteDialog = sap.ui.xmlfragment("techEd2018NetworkGraph.view.fragments.CreateRouteDialog", that);
        				that.getView().addDependent(that._createRouteDialog);
                    }
        			that._createRouteDialog.open();
        		}
        	});

        	var importQueueBtn = new sap.suite.ui.commons.networkgraph.ActionButton({
        		"icon": "sap-icon://list",
        		"title": "Go to Import Queue",
        		"press": function() {
        			//navigate to fake import queue
                	var allNodesData = that.allNodes.getData();
        			//save node data to session storage
        			jQuery.sap.storage(jQuery.sap.storage.Type.session).put("allNodes", JSON.stringify(allNodesData));
                	var nodeId = that.getView().getModel("selectedNode").getData().id;
                	var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                	oRouter.navTo("ImportQueue", {
                        nodeid : nodeId
                    });
        		}
        	});
        	
        	var editNodeBtn = new sap.suite.ui.commons.networkgraph.ActionButton({
        		"icon": "sap-icon://edit",
        		"title": "Edit Node",
        		"press": function() {
        			//open edit node dialog
        			if (!that._editNodeDialog) {
        				that._editNodeDialog = sap.ui.xmlfragment("techEd2018NetworkGraph.view.fragments.EditNodeDialog", that);
        				that.getView().addDependent(that._editNodeDialog);
                    }
        			
        			that._editNodeDialog.open();
        		}
        	});
        	
        	var deleteNodeBtn = new sap.suite.ui.commons.networkgraph.ActionButton({
        		"icon": "sap-icon://delete",
        		"title": "Delete Node",
        		"press": function() {
        			//open delete node dialog
        			if (!that._deleteNodeDialog) {
        				that._deleteNodeDialog = sap.ui.xmlfragment("techEd2018NetworkGraph.view.fragments.DeleteNodeWarningDialog", that);
        				that.getView().addDependent(that._deleteNodeDialog);
                    }
        			that._deleteNodeDialog.open();
        		}
        	});
        	
        	newNode.addActionButton(addRouteBtn);
        	newNode.addActionButton(importQueueBtn);
        	newNode.addActionButton(editNodeBtn);
        	newNode.addActionButton(deleteNodeBtn);
        	this._graph.insertNode(newNode, nodeToEdit.id);
        	
        	//then edit node data in all nodes
        	nodeToEdit.description = editNodeDescription;
        	nodeToEdit.upload_allowed = editNodeUpload;
        	nodeToEdit.role = editNodeRole;
        	nodeToEdit.content_type = editNodeCT;
        	nodeToEdit.content_type_key = editNodeCTId;
        	nodeToEdit.destination = editNodeDest;
        	nodeToEdit.destination_key = editNodeDestId;
        	
        	//change selectedNode data, too
        	var selectedNode = this.getView().getModel("selectedNode").getData();
        	selectedNode.description = editNodeDescription;
        	selectedNode.upload_allowed = editNodeUpload;
        	selectedNode.role = editNodeRole;
        	selectedNode.content_type = editNodeCT;
        	selectedNode.content_type_key = editNodeCTId;
        	selectedNode.destination = editNodeDest;
        	selectedNode.destination_key = editNodeDestId;
        	var newSelectedNodeModel = new JSONModel(selectedNode);
        	this.getView().setModel(newSelectedNodeModel, "selectedNode");
        	
        	//finally, change route data model
        	var newNodeModel = new JSONModel(currentNodes);
        	this.allNodes = newNodeModel;
        	
        	this._editNodeDialog.close();
        },
        
        onEditNodeClosePress : function() {
        	this._editNodeDialog.close();
        },
        
        onEditRoutePress : function() {
        	//open edit route dialog
			if (!this._editRouteDialog) {
				this._editRouteDialog = sap.ui.xmlfragment("techEd2018NetworkGraph.view.fragments.EditRouteDialog", this);
				this.getView().addDependent(this._editRouteDialog);
            }
			this._editRouteDialog.open();
        },
        
        afterEditRouteOpen : function() {
        	if(!this.sourceNodes) {
    			this.sourceNodes = this.allNodes.getData();
        	}
        	if(!this.targetNodes) {
        		this.targetNodes = this.allNodes.getData();
        	}
        	var oldRouteData = this.getView().getModel("selectedRoute").getData();
        	this.oldRouteTo = oldRouteData.to;
        	this.oldRouteFrom= oldRouteData.from;
        	var allRoutesData = this.allRoutes.getData();
        	var allNodesData = this.allNodes.getData();
        	var indexOfCurrentRouteSource = allRoutesData.indexOf(oldRouteData);
        	if(indexOfCurrentRouteSource != -1) {	
            	//TODO: set up limited number of targets
            	var availableTargetsModel = new JSONModel(this.targetNodes);
        		var availableSourcesModel = new JSONModel(this.sourceNodes);
        		this._editRouteDialog.setModel(availableTargetsModel, "availableEditTargets");
        		this._editRouteDialog.setModel(availableSourcesModel, "availableEditSources");
        	} else {
        		window.alert("Missing route data");
        	}
        },
        
        onEditSourceTargetSelect : function(oEvent) {
            // Change target or source model based on selection
            var selection = parseInt(oEvent.getParameter("selectedItem").getKey());
            var parent = oEvent.getParameter("id");
            var sourceNodeSelected = sap.ui.getCore().byId("editSourceNode").getSelectedKey();
            var targetNodeSelected = sap.ui.getCore().byId("editTargetNode").getSelectedKey();
            if(parent == "editSourceNode") {
                // remove selected item from target model
                var updatedTargetModel = new sap.ui.model.json.JSONModel();
                var updatedTargetData = this.targetNodes.filter(function(t) { return t.id != selection; });
                updatedTargetModel.setData(updatedTargetData);
                this._editRouteDialog.setModel(updatedTargetModel, "availableEditTargets");
                // and reset target node due to change in model
                sap.ui.getCore().byId("editTargetNode").setSelectedKey(targetNodeSelected);
            } else if(parent == "editTargetNode") {
                // remove selected item from source model
                var updatedSourceModel = new sap.ui.model.json.JSONModel();
                var updatedSourceData = this.sourceNodes.filter(function(t) { return t.id != selection; });
                updatedSourceModel.setData(updatedSourceData);
                this._editRouteDialog.setModel(updatedSourceModel, "availableEditSources");
                // and reset source node due to change in model
                sap.ui.getCore().byId("editSourceNode").setSelectedKey(sourceNodeSelected);
            }
        },
        
        onEditRoute : function() {
        	//Do actual route edit here
        	var that = this;
        	var editRouteName = sap.ui.getCore().byId("editRouteName").getValue();
        	var editRouteDescription = sap.ui.getCore().byId("editRouteDescription").getValue();
        	var editRouteTarget = sap.ui.getCore().byId("editTargetNode").getSelectedItem().getText();
        	var editRouteTargetId = parseInt(sap.ui.getCore().byId("editTargetNode").getSelectedKey());
        	var currentRoutes = this.allRoutes.getData();
        	var graphData = this.graphModel.getData();
        	var graphRoutes = graphData.lines;
        	var allLines = this._graph.getLines();
        	
        	//find specific route from all routes
        	var routeToEdit = $.grep(currentRoutes, function(r) {
        		return r.name === editRouteName;
        	})[0];
        	
        	// first edit route in graph model
        	var routeToEditInGraph = $.grep(graphRoutes, function(r) {
        		var from = parseInt(routeToEdit.from);
        		var to = parseInt(that.oldRouteTo);
        		return (r.from === from && r.to === to);
        	})[0];
        	
        	var routeInGraph = $.grep(allLines, function(l) {
        		var from = routeToEdit.from;
        		var to = that.oldRouteTo;
        		var lfrom = parseInt(l.mProperties.from);
        		var lto = parseInt(l.mProperties.to);
        		return (lfrom === from && lto === to);
        	})[0];
        	
        	//routeToEditInGraph.to = editRouteTargetId;
        	this.graphModel = new JSONModel(graphData);
        	var newLine = new sap.suite.ui.commons.networkgraph.Line({
        		"from": routeToEdit.from,
        		"to": editRouteTargetId,
        		"press": function(oEvent) {
        			oEvent.preventDefault();
        		}
        	});
        	//delete old route as well
        	this._graph.removeLine(routeInGraph);
        	this._graph.insertLine(newLine);
        	
        	//then change route data in all routes
        	routeToEdit.description = editRouteDescription;
        	routeToEdit.targetNode = editRouteTarget;
        	routeToEdit.to = editRouteTargetId;
        	
        	//change selectedRoute data, too
        	var selectedRoute = this.getView().getModel("selectedRoute").getData();
        	selectedRoute.description = editRouteDescription;
        	selectedRoute.targetNode = editRouteTarget;
        	selectedRoute.to = editRouteTargetId;
        	var newSelectedRouteModel = new JSONModel(selectedRoute);
        	this.getView().setModel(newSelectedRouteModel, "selectedRoute");
        	
        	//finally, change route data model
        	var newRouteModel = new JSONModel(currentRoutes);
        	this.allRoutes = newRouteModel;
        	
        	this._editRouteDialog.close();
        },
        
        onEditRouteClosePress : function() {
        	this._editRouteDialog.close();
        },
        
        onDeleteNodePress : function() {
        	//open delete node dialog
			if (!this._deleteNodeDialog) {
				this._deleteNodeDialog = sap.ui.xmlfragment("techEd2018NetworkGraph.view.fragments.DeleteNodeWarningDialog", this);
				this.getView().addDependent(this._deleteNodeDialog);
            }
			this._deleteNodeDialog.open();
        },
        
        onDeleteNode : function() {
        	//Do actual node deletion here
        	var that = this;

        	//remove node from all nodes model
        	var selectedNode = this.getView().getModel("selectedNode").getData();
        	var currentNodes = this.allNodes.getData();
        	var selectedNodeIndex = currentNodes.indexOf(selectedNode);
        	currentNodes.splice(selectedNodeIndex, 1);
        	var newNodeModel = new JSONModel(currentNodes);
        	this.allNodes = newNodeModel;
        	var graphData = this.graphModel.getData();
        	var allLines = this._graph.getLines();
        	
        	//need to delete node and any routes from node as well
        	var allRoutesData = this.allRoutes.getData();
        	var routesWithNode = $.grep(allRoutesData, function(route) {
        		return (route.from === selectedNode.id || route.to === selectedNode.id);
        	});
        	
        	var routesWithNodeInGraph = $.grep(allLines, function(route) {
        		var from = parseInt(route.getFrom());
        		var to = parseInt(route.getTo());
        		return (from === selectedNode.id || to === selectedNode.id);
        	});
        	
        	//If node has multiple routes, delete all routes
        	routesWithNode.forEach(function(route) {
        		//remove route from all routes model
        		var selectedRouteIndex = allRoutesData.indexOf(route);
        		//remove from all routes data
            	allRoutesData.splice(selectedRouteIndex, 1);
        		//remove from graph data
        		//then finally delete route from actual graph model
        		var routeInGraph = $.grep(graphData.lines, function(r) {
        			return (r.to === route.to && r.from === route.from);
        		})[0];
        		
        		var index = graphData.lines.indexOf(routeInGraph);
        		graphData.lines.splice(index, 1);
        	});
        	
        	routesWithNodeInGraph.forEach(function(route) {
        		//remove from actual graph          	
        		that._graph.removeLine(route);
        	});
        	
        	var newRouteModel = new JSONModel(allRoutesData);
        	this.allRoutes = newRouteModel;
        	
        	this._graph.removeNode(selectedNode.id);
        	
        	//then finally delete node from actual graph model
    		var nodeInGraph = $.grep(graphData.nodes, function(n) {
    			return n.title === selectedNode.name + " (" + selectedNode.role + ")";
    		})[0];
    		
    		var index = graphData.nodes.indexOf(nodeInGraph);
    		graphData.nodes.splice(index, 1);
    		var newGraphModel = new JSONModel(graphData);
    		this.graphModel = newGraphModel;
        	
        	this._deleteNodeDialog.close();
        	
        	//set properties window to default
        	this.getView().byId("propertiesPlaceholderText").setVisible(true);
    		this._routeProperties.setVisible(false);
    		this._nodeProperties.setVisible(false);
        },
       
        onDeleteNodeWarningClosePress : function() {
        	this._deleteNodeDialog.close();
        },
        
        onDeleteRoutePress : function() {
        	//open delete route dialog
			if (!this._deleteRouteDialog) {
				this._deleteRouteDialog = sap.ui.xmlfragment("techEd2018NetworkGraph.view.fragments.DeleteRouteWarningDialog", this);
				this.getView().addDependent(this._deleteRouteDialog);
            }
			this._deleteRouteDialog.open();
        },
        
        onDeleteRoute : function() {
        	//Do actual route deletion here
        	//remove route from all routes model
        	var currentRoutes = this.allRoutes.getData();
        	var selectedRoute = this.getView().getModel("selectedRoute").getData();
    		var selectedRouteIndex = currentRoutes.indexOf(selectedRoute);
    		currentRoutes.splice(selectedRouteIndex, 1);
    		this.allRoutes = new JSONModel(currentRoutes);
    		var graphData = this.graphModel.getData();
    		
    		//delete route from graph
    		this._graph.removeLine(selectedRoute.id);
    		
    		//then finally delete route from actual graph model
    		var routeInGraph = $.grep(graphData.lines, function(r) {
    			return (r.to === selectedRoute.to && r.from === selectedRoute.from);
    		})[0];
    		
    		var index = graphData.lines.indexOf(routeInGraph);
    		graphData.lines.splice(index, 1);
    		var newGraphModel = new JSONModel(graphData);
    		this.graphModel = newGraphModel;
    		
        	this._deleteRouteDialog.close();
        	//set properties window to default
        	this.getView().byId("propertiesPlaceholderText").setVisible(true);
    		this._routeProperties.setVisible(false);
    		this._nodeProperties.setVisible(false);
        },
        
        onDeleteRouteWarningClosePress : function() {
        	this._deleteRouteDialog.close();
        },
        
        onBeforeRendering : function() {
            
        },
        
        onAfterRendering : function() {
        	//this.byId("graphWrapper").$().css("overflow-y", "auto");
        },

    });

});
