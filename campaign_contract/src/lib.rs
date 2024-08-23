#![cfg_attr(not(feature = "std"), no_std)]

//! # A Concordium V1 smart contract
use concordium_std::*;
use core::fmt::Debug;
use std::collections::BTreeMap;

#[derive(Serialize, SchemaType, Clone)]
pub struct Campaign {
    id: u32,
    title: String,
    description: String,
    nationality: Vec<String>,
    tasks: Tasks,
    age_range: AgeRange,
    creator: Address,
    participants: u32,
    list_of_participants: Vec<Address>,
}

#[derive(Serialize, SchemaType, Clone)]
pub struct Tasks {
    tasks: Vec<String>,
    answers: BTreeMap<Address, Vec<String>>,
}

#[derive(Serialize, SchemaType, Clone)]
pub struct AgeRange {
    lower: String,
    upper: String,
}

#[derive(Serialize, SchemaType, Clone)]
pub struct CampaignWithStatus {
    campaign: Campaign,
    completed: bool,
    authorized: bool,
    minted: bool,
}

#[derive(Serialize, SchemaType, Clone)]
pub struct State {
    campaigns: Vec<Campaign>,
    next_campaign_id: u32,
    user_campaign_status: BTreeMap<Address, BTreeMap<u32, bool>>,
    user_authorize_status: BTreeMap<Address, BTreeMap<u32, bool>>,
    user_minted_status: BTreeMap<Address, BTreeMap<u32, bool>>,
}

/// Your smart contract errors.
#[derive(Debug, PartialEq, Eq, Reject, Serialize, SchemaType)]
pub enum Error {
    /// Failed parsing the parameter.
    #[from(ParseError)]
    ParseParams,
    /// Your error
    YourError,
}

#[init(contract = "Campaign_contract")]
fn init(_ctx: &InitContext, _state_builder: &mut StateBuilder) -> InitResult<State> {
    let initial_state = State {
        campaigns: Vec::new(),
        next_campaign_id: 1,
        user_campaign_status: BTreeMap::new(),
        user_authorize_status: BTreeMap::new(),
        user_minted_status: BTreeMap::new(),
    };

    Ok(initial_state)
}

#[derive(Serialize, SchemaType)]
pub struct CreateCampaignParams {
    pub title: String,
    pub description: String,
    pub nationality: Vec<String>,
    pub tasks: Vec<String>,
    pub age_range: AgeRange,
}

#[receive(
    contract = "Campaign_contract",
    name = "create_campaign",
    parameter = "CreateCampaignParams",
    mutable
)]
fn create_campaign(ctx: &ReceiveContext, host: &mut Host<State>) -> ReceiveResult<()> {
    let sender = ctx.sender();
    let state = host.state_mut();

    let params: CreateCampaignParams = ctx.parameter_cursor().get()?;

    let new_campaign = Campaign {
        id: state.next_campaign_id,
        title: params.title,
        description: params.description,
        nationality: params.nationality,
        tasks: Tasks {
            tasks: params.tasks.clone(),
            answers: BTreeMap::new(),
        },
        age_range: params.age_range,
        creator: sender,
        participants: 0,
        list_of_participants: Vec::new(),
    };

    state.campaigns.push(new_campaign);
    state.next_campaign_id += 1;

    Ok(())
}

#[receive(
    contract = "Campaign_contract",
    name = "get_campaigns",
    return_value = "Vec<CampaignWithStatus>"
)]
fn get_campaigns(
    ctx: &ReceiveContext,
    host: &Host<State>,
) -> ReceiveResult<Vec<CampaignWithStatus>> {
    let sender = ctx.sender();
    let state = host.state();

    let user_status = state
        .user_campaign_status
        .get(&sender)
        .cloned()
        .unwrap_or_default();
    let user_authorize_status = state
        .user_authorize_status
        .get(&sender)
        .cloned()
        .unwrap_or_default();
    let user_mint_status = state
        .user_minted_status
        .get(&sender)
        .cloned()
        .unwrap_or_default();

    let campaigns: Vec<CampaignWithStatus> = state
        .campaigns
        .iter()
        .map(|campaign| {
            let completed = user_status.get(&campaign.id).cloned().unwrap_or(false);
            let authorized = user_authorize_status
                .get(&campaign.id)
                .cloned()
                .unwrap_or(false);
            let minted = user_mint_status.get(&campaign.id).cloned().unwrap_or(false);
            CampaignWithStatus {
                campaign: campaign.clone(),
                completed,
                authorized,
                minted,
            }
        })
        .collect();

    Ok(campaigns)
}

#[derive(Serialize, SchemaType)]
pub struct CompleteParameters {
    id: u32,
    answers: Vec<String>,
}

#[receive(
    contract = "Campaign_contract",
    name = "complete_campaign",
    parameter = "CompleteParameters",
    mutable
)]
fn complete_campaign(ctx: &ReceiveContext, host: &mut Host<State>) -> ReceiveResult<()> {
    let sender: Address = ctx.sender();
    let campaign_id: u32 = ctx.parameter_cursor().get()?;
    let state: &mut State = host.state_mut();
    let parameter: CompleteParameters = ctx.parameter_cursor().get()?;

    // Check if the campaign exists
    if !state.campaigns.iter().any(|c| c.id == parameter.id) {
        return Err(Error::YourError.into());
    }

    // Mark the campaign as completed for the user
    state
        .user_campaign_status
        .entry(sender)
        .or_insert_with(BTreeMap::new)
        .insert(campaign_id, true);

    // Increase the participants count for the campaign
    if let Some(campaign) = state
        .campaigns
        .iter_mut()
        .find(|c| c.id == campaign_id)
        .filter(|campaign| !campaign.list_of_participants.contains(&sender))
    {
        campaign.participants += 1;
        campaign.list_of_participants.push(sender);
        campaign.tasks.answers.insert(sender, parameter.answers);
    }

    Ok(())
}
#[receive(
    contract = "Campaign_contract",
    name = "authorize_campaign",
    parameter = "u32",
    mutable
)]
fn authorize_campaign(ctx: &ReceiveContext, host: &mut Host<State>) -> ReceiveResult<()> {
    let sender = ctx.sender();
    let campaign_id: u32 = ctx.parameter_cursor().get()?;
    let state = host.state_mut();

    // Check if the campaign exists
    if !state.campaigns.iter().any(|c| c.id == campaign_id) {
        return Err(Error::YourError.into());
    }

    // Mark the campaign as authorized for the user
    state
        .user_authorize_status
        .entry(sender)
        .or_insert_with(BTreeMap::new)
        .insert(campaign_id, true);

    Ok(())
}
#[receive(
    contract = "Campaign_contract",
    name = "complete_mint",
    parameter = "u32",
    mutable
)]
fn complete_mint(ctx: &ReceiveContext, host: &mut Host<State>) -> ReceiveResult<()> {
    let sender = ctx.sender();
    let campaign_id: u32 = ctx.parameter_cursor().get()?;
    let state = host.state_mut();

    // Check if the campaign exists
    if !state.campaigns.iter().any(|c| c.id == campaign_id) {
        return Err(Error::YourError.into());
    }

    // Mark the campaign nft as minted for the user
    state
        .user_minted_status
        .entry(sender)
        .or_insert_with(BTreeMap::new)
        .insert(campaign_id, true);

    Ok(())
}
